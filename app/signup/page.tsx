"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Oddiy tekshirish
    if (!fullName || !username || !password || !confirmPassword) {
      setError("Iltimos, barcha maydonlarni to'ldiring")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Parollar mos kelmadi")
      setLoading(false)
      return
    }

    // Django backend bilan integratsiya qilish uchun
    // fetch('/api/signup', {method: 'POST', body: JSON.stringify({fullName, username, password})})

    // Demo uchun
    setTimeout(() => {
      router.push("/login")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-purple-100 to-purple-50">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Ro&apos;yxatdan o&apos;tish</CardTitle>
          <CardDescription className="text-center">
            Yangi hisob yaratish uchun ma&apos;lumotlaringizni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignup}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">To&apos;liq ism</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ism Familiya"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Login</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ro'yxatdan o'tkazilmoqda..." : "Ro'yxatdan o'tish"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground mt-2">
            Hisobingiz bormi?{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Tizimga kirish
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
