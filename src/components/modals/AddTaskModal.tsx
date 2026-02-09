'use client';
import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{ 
      zIndex: 9999,
      '& .MuiDrawer-paper': {
        width: '100%',
        maxWidth: '450px',
      }
   }}
      PaperProps={{
        className: "w-full max-w-md dark:bg-gray-900 dark:text-white p-0",
      }}
    >
      <div className="flex h-full flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Tambah Tugas Baru</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <Label>Judul Tugas</Label>
            <Input placeholder="Contoh: Survey pemetaan lahan..." />
          </div>

          <div>
            <Label>Pilih Proyek Advokasi</Label>
            <select className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-gray-800 dark:bg-gray-800">
              <option>Penyusunan modul edukasi pemilahan sampah</option>
              <option>Investigasi Tambang Kalimantan</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tenggat Waktu</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Prioritas</Label>
              <select className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm outline-none dark:border-gray-800 dark:bg-gray-800">
                <option>Normal</option>
                <option>Tinggi (Mendesak)</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Assignee (PIC)</Label>
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">D</div>
               <span className="text-sm font-medium">Dika Pratama</span>
               <button type="button" className="ml-auto text-xs text-primary font-bold">GANTI</button>
            </div>
          </div>

          <div>
            <Label>Catatan Tambahan</Label>
            <textarea 
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-sm outline-none focus:border-primary dark:border-gray-800 dark:bg-gray-800"
              placeholder="Detail tugas atau deskripsi lapangan..."
            />
          </div>
        </form>

        {/* Footer Action */}
        <div className="border-t p-6 dark:border-gray-800 flex gap-3">
          <Button onClick={onClose} className="flex-1 bg-gray-100 !text-gray-700 hover:bg-gray-200">
            Batal
          </Button>
          <Button className="flex-1">
            Simpan Tugas
          </Button>
        </div>
      </div>
    </Drawer>
  );
}