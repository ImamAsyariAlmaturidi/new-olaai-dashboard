// import type { Agent } from "@/app/(dashboard)/ai-agent/page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Settings, HelpCircle } from "lucide-react";
import Button from "@/components/ui/button/Button";

export default function GeneralTab() {
  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 ">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                HRD
              </CardTitle>
              <CardDescription>Last Trained: -</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 ">
          <div>
            <h3 className="font-semibold mb-2">AI Agent Behavior</h3>
            <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">
              Ini adalah Prompt AI yang akan mengatur gaya bicara dan identitas AI nya.
            </p>
            <textarea
              className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-700  rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="Kamu adalah Customer Service untuk bisnis bernama Software Development. Tugas-mu memberi informasi yang jelas, singkat, dan membantu. Gaya bicara-mu ramah, semi-formal, dan pakai emoji untuk berekspresi. Kamu tidak boleh menjawab pertanyaan yang tidak berkaitan dengan Software Development."
            />
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                28/01/2000
              </span>
            </div>
            <h3 className="font-semibold mb-2">Welcome Message 📋</h3>
            <p className="text-sm text-gray-600 mb-2 dark:text-gray-200">
              Pesan pertama yang akan dikirim AI kepada user
            </p>
            <p className="text-sm text-gray-500 mb-4 dark:text-gray-200">
              Jika tidak diisi maka Welcome Message tidak akan dikirim
            </p>
            <textarea
              className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="Halo! Selamat datang di Software Development. Saya asisten AI yang akan membantu semua pertanyaan mu terkait Software Development."
            />
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded dark:bg-gray-700">
                1:30/5000
              </span>
            </div>
            <h3 className="font-semibold mb-2">Agent Transfer Conditions</h3>
            <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">
              Tambahkan kondisi yang akan memicu Chat ke agent manusia. Status chat akan menjadi
              Pending dan akan muncul di tab Chat Queues.
            </p>
            <Input
              className="mb-4 dark:bg-gray-700 "
              placeholder="When the customer wants to purchase"
              defaultValue="When the customer wants to purchase"
            />
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded dark:bg-gray-700">0/750</span>
            </div>
            <h3 className="font-semibold mb-2">Stop AI after Handoff</h3>
            <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">
              Matikan AI mengapa sistem handoff telah berhasil menjadi Pending
            </p>
            <div className="flex items-center space-x-2">
              <Switch id="stop-ai" />
              <Label htmlFor="stop-ai" className="text-sm">
                Enable
              </Label>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Selected Labels</h3>
            <p className="text-sm text-gray-600 mb-4 dark:text-gray-300">
              AI dapat secara otomatis melabeli chat. Pilih label yang Anda inginkan untuk digunakan
              oleh AI
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">No Labels Available</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Additional Settings</h3>
            <Button variant="outline" className="text-blue-600 border-blue-600 dark:text-gray-300">
              Additional Settings →
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <Label htmlFor="model" className="text-sm font-medium flex items-center gap-2">
                Model <HelpCircle className="w-3 h-3 text-gray-400" />
              </Label>
              <p className="text-xs text-gray-500 mb-2 dark:text-gray-300">
                Ini adalah model AI yang akan dipakai.
              </p>
              <Select value="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard - 3 AI Credits per Response</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="history-limit"
                className="text-sm font-medium flex items-center gap-2"
              >
                AI History Limit <HelpCircle className="w-3 h-3 text-gray-400" />
              </Label>
              <p className="text-xs text-gray-500 mb-2 dark:text-gray-300">
                Berapa banyak pesan yang akan diingat AI
              </p>
              <Input type="number" defaultValue="20" />
            </div>

            <div>
              <Label
                htmlFor="context-limit"
                className="text-sm font-medium flex items-center gap-2"
              >
                AI Context Limit <HelpCircle className="w-3 h-3 text-gray-400" />
              </Label>
              <p className="text-xs text-gray-500 mb-2 dark:text-gray-300">
                Limit AI untuk membaca knowledge source. Jika knowledge lebih banyak, set ini
                menjadi lebih tinggi.
              </p>
              <Input type="number" defaultValue="10" />
            </div>

            <div>
              <Label
                htmlFor="message-await"
                className="text-sm font-medium flex items-center gap-2"
              >
                Message Await <HelpCircle className="w-3 h-3 text-gray-400" />
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Delay Waktu AI untuk mengirim pesan pengguna
              </p>
              <Input type="number" defaultValue="5" />
            </div>

            <div>
              <Label
                htmlFor="message-limit"
                className="text-sm font-medium flex items-center gap-2"
              >
                AI Message Limit <HelpCircle className="w-3 h-3 text-gray-400" />
              </Label>
              <p className="text-xs text-gray-500 mb-2">
                Limit pesan yang bisa dikirim oleh AI ke satu customer
              </p>
              <Input type="number" defaultValue="1000" />
            </div>

            <div>
              <Label htmlFor="timezone" className="text-sm font-medium flex items-center gap-2">
                Timezone <HelpCircle className="w-3 h-3 text-gray-400" />
              </Label>
              <p className="text-xs text-gray-500 mb-2">Pilih zona waktu untuk AI</p>
              <Select value="jakarta">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">(GMT+7:00) Bangkok, Hanoi, Jakarta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600">Save All Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
