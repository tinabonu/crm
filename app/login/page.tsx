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


export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Oddiy tekshirish
    if (!username || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring")
      setLoading(false)
      return
    }

    // Django backend bilan integratsiya qilish uchun
    // fetch('/api/login', {method: 'POST', body: JSON.stringify({username, password})})

    // Demo uchun
    setTimeout(() => {
      if (username === "elnora" && password === "elnora") {
        router.push("/dashboard")
      } else {
        setError("Login yoki parol noto'g'ri")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-purple-100 to-purple-50">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Kiyim-Kechak ERP</CardTitle>
          <CardDescription className="text-center">
            Tizimga kirish uchun ma&apos;lumotlaringizni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Login</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Tekshirilmoqda..." : "Kirish"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground mt-2">
            Hisobingiz yo&apos;qmi?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Ro&apos;yxatdan o&apos;tish
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
