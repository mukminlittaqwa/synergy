'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-primary h-11 w-11 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
        onClick={handleClick}
      >
        {/* Dot Indicator */}
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-500 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-500 rounded-full opacity-75 animate-ping"></span>
        </span>
        
        <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z" fill="currentColor"/>
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[500px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:w-[380px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h5 className="text-lg font-bold text-gray-800 dark:text-white">
            Notifikasi Tim WALHI
          </h5>
          <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-full font-bold">
            3 Baru
          </span>
        </div>

        <ul className="flex flex-col overflow-y-auto custom-scrollbar flex-grow">
          {/* Notification Item 1 */}
          <li>
            <DropdownItem onItemClick={closeDropdown} className="flex gap-4 p-4 hover:bg-gray-50 border-b border-gray-50 dark:border-gray-800 dark:hover:bg-white/5 transition-colors">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image width={40} height={40} src="/images/user/user-02.jpg" alt="Dika" className="rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  <span className="font-bold text-gray-900 dark:text-white">Dika Pratama</span> baru saja mengunggah hasil survey koordinat mata air.
                </p>
                <span className="text-[11px] font-medium text-primary">Tahap Investigasi • 2 menit lalu</span>
              </div>
            </DropdownItem>
          </li>

          {/* Notification Item 2 */}
          <li>
            <DropdownItem onItemClick={closeDropdown} className="flex gap-4 p-4 hover:bg-gray-50 border-b border-gray-50 dark:border-gray-800 dark:hover:bg-white/5 transition-colors">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image width={40} height={40} src="/images/user/user-03.jpg" alt="Wulan" className="rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-orange-400 dark:border-gray-900"></span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  <span className="font-bold text-gray-900 dark:text-white">Wulan S.</span> meminta persetujuan untuk dana kampanye media sosial.
                </p>
                <span className="text-[11px] font-medium text-gray-400">Finance • 1 jam lalu</span>
              </div>
            </DropdownItem>
          </li>

          {/* Notification Item 3 (Urgent) */}
          <li>
            <DropdownItem onItemClick={closeDropdown} className="flex gap-4 p-4 hover:bg-red-50/30 border-b border-gray-50 dark:border-gray-800 dark:hover:bg-red-900/10 transition-colors">
              <div className="relative h-10 w-10 flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-red-700 dark:text-red-400 leading-snug font-medium">
                  Laporan Titik Api Baru terdeteksi di koordinat Kalimantan Timur oleh sistem satelit.
                </p>
                <span className="text-[11px] font-bold text-red-500 uppercase">Urgent • 3 jam lalu</span>
              </div>
            </DropdownItem>
          </li>
        </ul>

        <Link
          href="/notifications"
          className="block w-full py-3 mt-4 text-xs font-bold text-center text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-all"
        >
          Lihat Semua Aktivitas
        </Link>
      </Dropdown>
    </div>
  );
}