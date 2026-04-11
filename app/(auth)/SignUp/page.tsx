'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2 } from 'lucide-react'

import { toast } from "react-hot-toast"
import { AuthLayout } from '../auth/AuthLayout'
import { GoogleButton } from '../auth/GoogleButton'
import { AuthInput } from '../auth/AuthInput'
import { OTPInput } from '../auth/OTPInput'
import api from '@/lib/api'

type Step = 'form' | 'otp' | 'success'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const errs: typeof errors = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'At least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const result = await api.post('/verify-otp', { email, password })

      setLoading(false)
      setStep('otp')
      toast.success(result.data.message)
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error)
      setLoading(false)
    }
  }

  const handleOTP = async (code: string) => {
    const date = new Date()
    const currentTime = date.getHours() + ':' + date.getMinutes() + setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    if (code.length === 6) {
      const result = await api.post('/signup', { code, email, password, currentTime })
      toast.success(result.data.message)
      setStep('success')
    } else {
      toast.error('Invalid code')
    }
  }

  const handleGoogle = () => {
    toast.success('Google sign-up clicked (UI only)')
  }

  const titles: Record<Step, string> = {
    form: 'Start your journey.',
    otp: 'Verify your email.',
    success: "You're in.",
  }

  return (
    <AuthLayout
      title={titles[step]}
      subtitle={step === 'otp' ? `We sent a 6-digit code to ${email}` : undefined}
    >
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Create account
            </h2>
            <p className="mt-1 text-sm text-muted-foreground mb-8">
              Already have an account?{' '}
              <Link href="/SignIn" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>

            <GoogleButton onClick={handleGoogle} />

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <AuthInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-foreground text-background rounded-xl font-medium text-sm auth-shadow hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Create account
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        )}

        {step === 'otp' && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Enter verification code
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We just sent a 6-digit code to your inbox.
              </p>
            </div>

            <OTPInput onComplete={handleOTP} disabled={loading} />

            {loading && (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            )}

            <button
              onClick={() => setStep('form')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to sign up
            </button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Account verified!
            </h2>
            <p className="text-sm text-muted-foreground">
              Your account has been created successfully.
            </p>
            <Link
              href="/SignIn"
              className="inline-block mt-4 text-primary hover:underline font-medium text-sm"
            >
              Continue to sign in →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}

export default SignUp
