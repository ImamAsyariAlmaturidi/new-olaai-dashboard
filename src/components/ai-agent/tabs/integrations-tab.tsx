import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus } from "lucide-react";

export default function IntegrationsTab() {
  const connectedApps = [
    {
      name: "Cek Ongkos Kirim",
      description: "Mengecek ongkir dari berbagai kurir dan mendapatkan status pengiriman",
      icon: "📦",
      status: "Inactive",
      color: "bg-yellow-100",
    },
    {
      name: "Auto Reminder",
      description: "Buat reminder untuk melakukan tugas tertentu pada waktu tertentu",
      icon: "⏰",
      status: "Inactive",
      color: "bg-pink-100",
    },
    {
      name: "Kirim Notifikasi Pribadi",
      description:
        "Kirim notification pribadi ke No HP anda jika ada customer yang order atau melakukan aktivitas tertentu",
      icon: "👤",
      status: "Inactive",
      color: "bg-blue-100",
    },
    {
      name: "Allow List (Whitelist numbers)",
      description:
        "Buat daftar nomor telepon yang diizinkan untuk berinteraksi dengan AI dan blokir sisanya",
      icon: "📋",
      status: "Inactive",
      color: "bg-orange-100",
    },
    {
      name: "Google Sheets",
      description: "Hubungkan ke Google Sheets untuk membaca dan menulis data",
      icon: "📊",
      status: "Inactive",
      color: "bg-green-100",
    },
    {
      name: "Nearest Location",
      description: "Mencari lokasi terdekat dari customer",
      icon: "📍",
      status: "Inactive",
      color: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 ">
      <div>
        <h2 className="text-xl font-semibold mb-2">Connected Apps</h2>
        <p className="text-gray-600 mb-6 dark:text-gray-300">
          Connect your chatbot with third-party applications to extend its functionality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {connectedApps.map((app, index) => (
            <Card key={index} className={`${app.color} border-0`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{app.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {app.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-2">{app.name}</h3>
                <p className="text-xs text-gray-600 mb-4 line-clamp-3">{app.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Activate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">AI Tools</h2>
        <p className="text-gray-600 mb-4 dark:text-gray-300">
          Enable AI tools to enhance your chatbot&apos;s capabilities with additional
          functionalities.
        </p>
        <div className="flex gap-4 mb-6">
          <Button variant="outline" size="sm" className="dark:text-gray-800">
            <Settings className="w-4 h-4 mr-2" />
            Open AI Tools Settings
          </Button>
        </div>

        <Card className="bg-gray-50 border-dashed border-2 border-gray-200 dark:bg-gray-700">
          <CardContent className="p-8 text-center dark:bg-gray-700">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2 dark:text-gray-300">Create AI Tool</h3>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Register Third Party Apps</h2>
        <p className="text-gray-600 mb-4 dark:text-gray-300">
          Register your third party apps to enhance your chatbot&apos;s capabilities.
        </p>

        <Card className="bg-blue-50 border-0 dark:bg-gray-700">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Not Registered
              </Badge>
            </div>
            <h3 className="font-semibold text-sm mb-2 dark:text-gray-200">Netzme</h3>
            <p className="text-xs text-gray-600 mb-4 dark:text-gray-300">
              Pembayaran transaksi melalui qris
            </p>
            <Button variant="outline" size="sm" className="text-xs">
              Register
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
