import React, { useState } from "react";
import { FaSearch, FaBell, FaCaretDown } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import Image from "next/image";

export default function NavigationBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow-md" style={{ height: "67px", width: "1186px" }}>
      {/* Search Bar */}
      <div className="flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full bg-gray-100 px-4 py-2 pl-10 text-sm focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div
          className="relative"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full  hover:bg-gray-100 focus:outline-none">
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">6</span>
          </button>
          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-[257px] bg-white shadow-lg rounded-lg p-4"
              style={{ height: "256px" }}
            >
              <h4 className="text-sm font-medium mb-2">Notifications</h4>
              <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <FaBell />
                </span>
                <div>
                  <p className="text-sm font-medium">Settings</p>
                  <p className="text-xs text-gray-500">Update Dashboard</p>
                </div>
              </button>
              <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white">
                  <FaBell />
                </span>
                <div>
                  <p className="text-sm font-medium">Profile</p>
                  <p className="text-xs text-gray-500">Update your profile</p>
                </div>
              </button>
              <button className="w-full mt-4 text-blue-500 text-sm">See all notifications</button>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div
          className="relative"
          onMouseEnter={() => setShowLanguageDropdown(true)}
          onMouseLeave={() => setShowLanguageDropdown(false)}
        >
          <button className="flex items-center gap-2 py-2 px-3 rounded-md  hover:bg-gray-100 focus:outline-none">
            <Image
              src="/bangladesh-flag.png"
              alt="Bangladesh Flag"
              width={40}
              height={26}
              className="rounded-sm"
            />
            <span className="text-sm font-medium">BAN</span>
            <FaCaretDown className="text-gray-600" />
          </button>
          {showLanguageDropdown && (
            <div
              className="absolute right-0 mt-2 w-[209px] bg-white shadow-lg rounded-lg p-4"
              style={{ height: "154px" }}
            >
              <h4 className="text-sm font-medium mb-2">Select Language</h4>
              <button className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <Image src="/uk-flag.png" alt="UK Flag" width={20} height={12} />
                  <span className="text-sm">English</span>
                </div>
                <FaCaretDown className="text-gray-500" />
              </button>
              <button className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <Image src="/bangladesh-flag.png" alt="Bangladesh Flag" width={20} height={12} />
                  <span className="text-sm">Bangladesh</span>
                </div>
                <FaCaretDown className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          className="relative"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <button className="flex items-center gap-2 py-2 px-3 rounded-m hover:bg-gray-100 focus:outline-none">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="text-sm">
              <span className="font-medium">Sumaiya</span>
              <p className="text-gray-500 text-xs">Vendor</p>
            </div>
            <FaCaretDown className="text-gray-600" />
          </button>
          {showProfileDropdown && (
            <div
              className="absolute right-0 mt-2 w-[205px] bg-white shadow-lg rounded-lg p-4"
              style={{ height: "175px" }}
            >
              <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <FaCaretDown />
                </span>
                <span className="text-sm">Manage Account</span>
              </button>
              <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-pink-500 text-white">
                  <FaCaretDown />
                </span>
                <span className="text-sm">Change Password</span>
              </button>
              <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white">
                  <FaCaretDown />
                </span>
                <span className="text-sm">Activity Log</span>
              </button>
              <button className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-gray-100">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white">
                  <FaCaretDown />
                </span>
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
