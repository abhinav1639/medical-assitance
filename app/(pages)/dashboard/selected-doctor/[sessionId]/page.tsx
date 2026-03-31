

'use client';

import { useParams } from 'next/navigation';
import { doctors } from '@/app/data/data';
import Vapi from '@vapi-ai/web';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  MessageSquare,
} from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import api from '@/lib/api';

type CallState = 'idle' | 'calling' | 'connected' | 'ended';

const SelectedDoctor = () => {
  const param = useParams();
  const { sessionId } = param;

  const [callState, setCallState] = useState<CallState>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<'user' | 'assistant'>('user');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  const { doctorSession } = useSelector((state: any) => state.user);
  const doctor = doctors.find((doc) => doc.name === doctorSession?.doctorName);

  // Waveform animation
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(32).fill(6));

  // Wave animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (callState === 'connected' && !isMuted) {
      interval = setInterval(() => {
        setWaveHeights(Array(32).fill(0).map(() => Math.random() * 48 + 8));
      }, 120);
    } else {
      setWaveHeights(Array(32).fill(6));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState, isMuted]);

  // Vapi Initialization
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
      console.warn('NEXT_PUBLIC_VAPI_API_KEY is missing');
      return;
    }

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    vapiRef.current = vapi;

    const handleCallStart = () => {
      console.log('✅ Call started');
      setCallState('connected');
      setCallDuration(0);
    };

    const handleCallEnd = (reason?: any) => {
      console.log('Call ended. Reason:', reason);
      setCallState('ended');
      setLiveTranscript('');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleError = (err: any) => {
      console.error('Vapi Error:', err);

      const errorMsg = err?.errorMsg || err?.message?.errorMsg || err?.message || '';

      // Normal endings (not real errors)
      if (
        errorMsg.includes('Meeting has ended') ||
        errorMsg.includes('ejection') ||
        errorMsg.includes('room was deleted') ||
        errorMsg.includes('Call ended') ||
        errorMsg.includes('Call has ended')
      ) {
        console.info('Normal call termination detected');
        handleCallEnd(err);
        return;
      }

      // Real errors
      console.error('Real error:', err);
      alert(`Call error: ${errorMsg || 'Unknown error'}`);
      setCallState('ended');
    };

    const handleMessage = (msg: any) => {
      // Vapi emits multiple event/message types depending on SDK version + config.
      // Common ones are `transcript` and `transcription`. Handle both.
      if (msg?.type !== 'transcript' && msg?.type !== 'transcription') return;

      // Vapi payload shape can vary slightly (some versions use `transcript`, others `transcription`).
      // Keep a log so you can verify whether *user* transcripts are arriving.
      console.log('📨 Transcript message:', msg);

      const transcriptText =
        (typeof msg.transcript === 'string' ? msg.transcript : msg.transcript?.text) ??
        (typeof msg.transcription === 'string' ? msg.transcription : msg.transcription?.text) ??
        (typeof msg.text === 'string' ? msg.text : msg.text?.text) ??
        '';
      if (!transcriptText) return;

      const roleRaw = msg.role;
      const normalizedRole: 'user' | 'assistant' =
        roleRaw === 'assistant' || roleRaw === 'agent' || roleRaw === 'bot'
          ? 'assistant'
          : 'user';

      const transcriptType = msg.transcriptType ?? 'final';

      if (transcriptType === 'partial') {
        setLiveTranscript(transcriptText);
        setCurrentSpeaker(normalizedRole);
        return;
      }

      setMessages((prev) => [...prev, { role: normalizedRole, text: transcriptText }]);
      setLiveTranscript('');
    };

    // Attach listeners
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('error', handleError);
    vapi.on('message', handleMessage);

    return () => {
      vapi.removeAllListeners();
      vapi.stop();
      vapiRef.current = null;
    };
  }, []);

  // Timer
  useEffect(() => {
    if (callState === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (callState === 'idle') setCallDuration(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startCall = useCallback(() => {
    const assistantId = doctor?.vapiId;
    if (!assistantId || !vapiRef.current) {
      alert('Assistant ID not found or Vapi not initialized');
      return;
    }

    setCallState('calling');
    setMessages([]);
    setLiveTranscript('');

    // Preflight mic permission so failures show clearly (and helps with BT earbuds switching).
    // We immediately stop tracks; Vapi will acquire audio again for the call.
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
        vapiRef.current?.start(assistantId);
      })
      .catch((err) => {
        console.error('Microphone permission/device error:', err);
        alert(
          'Microphone is not available. Check browser mic permission and Windows sound input device (your earbuds mic).'
        );
        setCallState('idle');
      });
  }, [doctor?.vapiId]);

  const endCall = useCallback(async () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }

    setCallState('ended');
    setLiveTranscript('');

    // Save report
    try {
      const result = await api.post('/reports', {
        id: doctorSession?.id,
        voiceChat: messages,
      });
      console.log('Report saved:', result.data);
    } catch (err) {
      console.error('Failed to save report:', err);
    }
  }, [doctorSession?.id, messages]);

  const toggleMute = () => {
    if (!vapiRef.current) return;

    const newMuted = !isMuted;
    vapiRef.current.setMuted(newMuted);
    setIsMuted(newMuted);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Left - Call Area */}
      <div className="flex-1 flex flex-col relative bg-zinc-900">
        <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold">
              {doctor?.name?.slice(0, 2).toUpperCase() || 'DR'}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{doctor?.name}</h2>
            </div>
          </div>

          <div className="text-sm font-mono text-zinc-400">
            {callState === 'connected' && formatTime(callDuration)}
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <motion.div
            animate={{ scale: callState === 'connected' ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-40 h-40 rounded-3xl bg-linear-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-6xl shadow-2xl shadow-violet-500/30">
              👨‍⚕️
            </div>

            {callState === 'connected' && (
              <motion.div
                className="absolute -inset-6 rounded-3xl border border-violet-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.div>

          <div className="mt-10 text-center">
            <p className="text-2xl font-medium tracking-tight">
              {callState === 'idle' && 'Ready to consult with Doctor'}
              {callState === 'calling' && 'Connecting...'}
              {callState === 'connected' && 'Live Consultation'}
              {callState === 'ended' && 'Call Ended'}
            </p>
          </div>

          {callState === 'connected' && (
            <div className="mt-12 flex gap-1 h-16 items-end">
              {waveHeights.map((height, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-linear-to-t from-violet-400 to-fuchsia-400 rounded-full"
                  animate={{ height }}
                  transition={{ duration: 0.15 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="pb-10 flex justify-center gap-6">
          {callState === 'connected' && (
            <>
              <ControlButton
                icon={isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                label={isMuted ? 'Unmute' : 'Mute'}
                onClick={toggleMute}
                active={isMuted}
              />
              <ControlButton
                icon={isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                label="Speaker"
                onClick={() => setIsSpeaker(!isSpeaker)}
                active={isSpeaker}
              />
              <ControlButton
                icon={isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                label="Video"
                onClick={() => setIsVideoOn(!isVideoOn)}
                active={isVideoOn}
              />
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={callState === 'idle' || callState === 'ended' ? startCall : endCall}
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all shadow-xl ${
              callState === 'idle' || callState === 'ended'
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {callState === 'idle' || callState === 'ended' ? (
              <Phone className="w-9 h-9" />
            ) : (
              <PhoneOff className="w-9 h-9" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Right - Transcript Panel */}
      <div className="w-5/12 bg-zinc-950 border-l border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-violet-400" />
            <h3 className="font-semibold text-lg">Live Conversation</h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 && !liveTranscript && (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-zinc-500">Conversation will appear here...</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-br-none'
                    : 'bg-zinc-800 text-zinc-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {liveTranscript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="max-w-[85%] px-5 py-3.5 bg-zinc-800/70 rounded-3xl rounded-bl-none text-sm text-zinc-300 italic flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {currentSpeaker === 'assistant' ? 'Doctor' : 'You'}: {liveTranscript}
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500 text-center">
          Powered by Vapi AI • Real-time transcription
        </div>
      </div>
    </div>
  );
};

const ControlButton = ({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 text-xs transition-all ${active ? 'text-white' : 'text-zinc-400'}`}
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
        active ? 'bg-zinc-700' : 'bg-zinc-800 hover:bg-zinc-700'
      }`}
    >
      {icon}
    </div>
    <span>{label}</span>
  </motion.button>
);

export default SelectedDoctor;