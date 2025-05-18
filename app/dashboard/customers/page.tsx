"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Plus, Search, Trash2, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Demo mijozlar
const initialCustomers = [
  {
    id: 1,
    name: "Ruxshona Navrozova",
    phone: "+998 90 123 45 67",
    email: "ruxshona@gmail.com",
    totalPurchases: 1250000,
    avatar: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    name: "Dilnoza Erkinboyeva",
    phone: "+998 91 234 56 78",
    email: "dilnoza@gmail.com",
    totalPurchases: 850000,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEIVg1tKe5su0pMzBmRsmLYMFWW8mNdP3y5A&s",
  },
  {
    id: 3,
    name: "Olimjon Rahmonov",
    phone: "+998 93 345 67 89",
    email: "Olimjon@gmail.com",
    totalPurchases: 2100000,
    avatar: "data:image/jpeg;base64,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",
  },
  {
    id: 4,
    name: "Shavkat Mirzayev",
    phone: "+998 94 456 78 90",
    email: "Shavkat@gmail.com",
    totalPurchases: 1750000,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuguX_0ZYVk5lq2GS5wcJfjNmAhkgTX822Xg&s",
  },
  {
    id: 5,
    name: "Ilhomjon Kambarov",
    phone: "+998 97 567 89 01",
    email: "Ilhomjon@gmail.com",
    totalPurchases: 3200000,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawSr7cfzQidY2sJuhyY8YV_8sXxB2BfDsog&s",
  },
  {
    id: 6,
    name: "Abdulhodiy Atahanov",
    phone: "+998 97 567 89 01",
    email: "Abdulhodiy@gmail.com",
    totalPurchases: 3200000,
    avatar: "data:image/jpeg;base64,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",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    totalPurchases: "0",
    avatar: "",
  })
  const [activeTab, setActiveTab] = useState("all")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCustomer = () => {
    const customerToAdd = {
      id: customers.length + 1,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      totalPurchases: Number.parseInt(newCustomer.totalPurchases),
      avatar: newCustomer.name
        ? `/placeholder.svg?height=40&width=40&text=${newCustomer.name
            .split(" ")
            .map((n) => n[0])
            .join("")}`
        : "",
    }

    setCustomers([...customers, customerToAdd])
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      totalPurchases: "0",
      avatar: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mijozlar</h1>
          <p className="text-muted-foreground">Barcha mijozlarni boshqarish</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Yangi mijoz
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi mijoz qo&apos;shish</DialogTitle>
              <DialogDescription>Yangi mijoz ma&apos;lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">To&apos;liq ism</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Ism Familiya"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+998 90 123 45 67"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="example@mail.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="totalPurchases">Jami xaridlar (so&apos;m)</Label>
                <Input
                  id="totalPurchases"
                  type="number"
                  value={newCustomer.totalPurchases}
                  onChange={(e) => setNewCustomer({ ...newCustomer, totalPurchases: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddCustomer}>Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b bg-card/80 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">Hammasi</TabsTrigger>
                <TabsTrigger value="active">Faol</TabsTrigger>
                <TabsTrigger value="new">Yangi</TabsTrigger>
                <TabsTrigger value="vip">VIP</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2 items-center">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Mijozlarni qidirish..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filtrlash
              </Button>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/20 h-9 px-3 flex items-center">
                Jami: {customers.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead></TableHead>
                  <TableHead>Ism</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Jami xaridlar</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            customer.totalPurchases > 2000000
                              ? "bg-primary/20 text-primary"
                              : customer.totalPurchases > 1000000
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }
                        >
                          {customer.totalPurchases.toLocaleString()} so&apos;m
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Mijozlar topilmadi
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <div className="flex">
          <Button variant="outline" size="sm" className="rounded-r-none">
            &lt;
          </Button>
          <Button size="sm" className="rounded-none pagination-active">
            1
          </Button>
          <Button variant="outline" size="sm" className="rounded-none">
            2
          </Button>
          <Button variant="outline" size="sm" className="rounded-none">
            3
          </Button>
          <Button variant="outline" size="sm" className="rounded-none">
            4
          </Button>
          <Button variant="outline" size="sm" className="rounded-none">
            5
          </Button>
          <Button variant="outline" size="sm" className="rounded-l-none">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
