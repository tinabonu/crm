"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Globe, Languages, MailCheck, Moon, Palette, Sun, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [successMessage, setSuccessMessage] = useState("")
  const [settings, setSettings] = useState({
    language: "uz",
    theme: "light",
    notifications: {
      email: true,
      sms: false,
      browser: true,
    },
    currency: "uzs",
    timezone: "Asia/Tashkent",
  })

  const handleSaveGeneral = () => {
    setSuccessMessage("Sozlamalar muvaffaqiyatli saqlandi")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    })
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sozlamalar</h1>
          <p className="text-muted-foreground">Tizim sozlamalarini boshqarish</p>
        </div>
      </div>

      {successMessage && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-600 dark:text-green-400">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Umumiy</TabsTrigger>
          <TabsTrigger value="notifications">Bildirishnomalar</TabsTrigger>
          <TabsTrigger value="appearance">Ko&apos;rinish</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Umumiy sozlamalar
              </CardTitle>
              <CardDescription>Tizimning asosiy sozlamalari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid gap-2">
                <Label htmlFor="language">Til</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings({ ...settings, language: value })}
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Tilni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uz">O&apos;zbek</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Valyuta</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => setSettings({ ...settings, currency: value })}
                >
                  <SelectTrigger id="currency" className="w-full">
                    <SelectValue placeholder="Valyutani tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uzs">So&apos;m (UZS)</SelectItem>
                    <SelectItem value="usd">Dollar (USD)</SelectItem>
                    <SelectItem value="eur">Yevro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Vaqt mintaqasi</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                >
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="Vaqt mintaqasini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Tashkent">Toshkent (UTC+5)</SelectItem>
                    <SelectItem value="Europe/Moscow">Moskva (UTC+3)</SelectItem>
                    <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6">
              <Button onClick={handleSaveGeneral}>Saqlash</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Xavfli zona
              </CardTitle>
              <CardDescription>
                Bu amallar qaytarib bo&apos;lmaydigan o&apos;zgarishlarga olib kelishi mumkin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ma&apos;lumotlarni tozalash</p>
                  <p className="text-sm text-muted-foreground">
                    Barcha ma&apos;lumotlarni tozalash. Bu amal qaytarib bo&apos;lmaydi.
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Tozalash
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <MailCheck className="h-5 w-5 text-primary" />
                Bildirishnoma sozlamalari
              </CardTitle>
              <CardDescription>Qanday bildirishnomalarni olishni xohlaysiz?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MailCheck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email bildirishnomalari</p>
                    <p className="text-sm text-muted-foreground">
                      Yangiliklar va o&apos;zgarishlar haqida email orqali xabar olish
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={() => handleNotificationChange("email")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Brauzer bildirishnomalari</p>
                    <p className="text-sm text-muted-foreground">
                      Tizimda bo&apos;lganingizda brauzer orqali bildirishnomalarni olish
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.browser}
                  onCheckedChange={() => handleNotificationChange("browser")}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6">
              <Button onClick={handleSaveGeneral}>Saqlash</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Ko&apos;rinish sozlamalari
              </CardTitle>
              <CardDescription>Tizimning ko&apos;rinishini sozlash</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label>Mavzu</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={settings.theme === "light" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({ ...settings, theme: "light" })}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Yorug&apos;
                  </Button>
                  <Button
                    variant={settings.theme === "dark" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({ ...settings, theme: "dark" })}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Qorong&apos;i
                  </Button>
                  <Button
                    variant={settings.theme === "system" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({ ...settings, theme: "system" })}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Tizim
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Til</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={settings.language === "uz" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({ ...settings, language: "uz" })}
                  >
                    <Languages className="mr-2 h-4 w-4" />
                    O&apos;zbek
                  </Button>
                  <Button
                    variant={settings.language === "ru" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({ ...settings, language: "ru" })}
                  >
                    <Languages className="mr-2 h-4 w-4" />
                    Русский
                  </Button>
                  <Button
                    variant={settings.language === "en" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({ ...settings, language: "en" })}
                  >
                    <Languages className="mr-2 h-4 w-4" />
                    English
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/30 px-6">
              <Button onClick={handleSaveGeneral}>Saqlash</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
