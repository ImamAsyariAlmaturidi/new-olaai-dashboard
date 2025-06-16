import Button from "@/components/ui/button/Button";
import { Plus, Save } from "lucide-react";

export default function FollowupsTab() {
  return (
    <div className="space-y-6 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ">
      <div>
        <h2 className="text-xl font-semibold mb-2">Followups</h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Tambahkan pesan Followup yang akan dikirim kepada pelanggan setelah jeda waktu tertentu.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Isi dengan prompt. Prompt adalah arahan yang AI akan pakai untuk menulis Followup sesuai
            dengan history chat dan knowledge anda.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Anda juga bisa menulis kondisi Handoff ke Agent anda di Prompt.
          </p>
          <p className="text-blue-600 dark:text-gray-300">
            Anda bisa mengirim gambar di followup. Klik disini untuk Upload gambar.
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Followup
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            <Save className="w-4 h-4 mr-2" />
            Save Followups
          </Button>
        </div>
      </div>
    </div>
  );
}
