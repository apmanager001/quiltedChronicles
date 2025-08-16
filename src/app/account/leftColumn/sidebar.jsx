"use client";
import React, { useId } from "react";
import Link from "next/link";
import axiosInstance from "@/comps/utility/axios";
import toast from "react-hot-toast";
import {
  Library,
  Bookmark,
  UserRoundPen,
  Pen,
  Settings,
  Lock,
  MessageSquareMore,
  Search,
  User,
  LogOut,
  Crown,
  Sparkles,
} from "lucide-react";
import useStore from "../../store/store";
import FollowedAuthors from "./comps/followedAuthors";
import Journal from "./comps/journal";
import Chapters from "./comps/chapters";
import Loading from "@/comps/utility/loading";

const Sidebar = ({ closeDrawer }) => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  const id = useId();

  if (!user) {
    return (
      <div className="flex h-[500px] justify-center items-center">
        <Link
          href="/login"
          className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <User className="w-5 h-5 mr-2" />
          Login to Continue
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      logout();
      window.location.href = "/login";
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
        <div className="avatar placeholder mb-3">
          <div className="bg-primary text-primary-content rounded-full w-16">
            <span className="text-xl font-bold">
              {user.userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <h3 className="font-bold text-lg text-base-content mb-1">
          {user.userName}
        </h3>
        <div className="flex items-center justify-center gap-1 text-sm text-base-content/70">
          <Sparkles className="w-3 h-3" />
          <span>Creative Writer</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider px-2 mb-3">
          Quick Actions
        </h4>

        <div className="space-y-1">
          <Link
            href="/createStory"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          >
            <Pen className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Create a Story</span>
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/10 hover:text-secondary transition-all duration-200 group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Search Stories</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/10 hover:text-accent transition-all duration-200 group"
          >
            <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Settings</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-info/10 hover:text-info transition-all duration-200 group"
          >
            <MessageSquareMore className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Contact</span>
          </Link>
        </div>
      </div>

      {/* Admin Section */}
      {user.admin && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider px-2 mb-3">
            Administration
          </h4>
          <Link
            href="/admin"
            className="flex items-center gap-3 p-3 rounded-xl bg-warning/10 hover:bg-warning/20 text-warning hover:text-warning-focus transition-all duration-200 group border border-warning/20"
          >
            <Crown className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Admin Panel</span>
          </Link>
        </div>
      )}

      {/* Collapsible Sections */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider px-2 mb-3">
          Your Content
        </h4>

        {/* Authors Section */}
        <div className="collapse collapse-arrow bg-base-200/50 rounded-xl border border-base-300/50">
          <input type="radio" name="accordion" id={`authors-${id}`} />
          <div className="collapse-title flex items-center gap-3 p-4 font-medium hover:bg-base-200/70 transition-colors duration-200">
            <UserRoundPen className="w-5 h-5 text-primary" />
            <span>Your Authors</span>
          </div>
          <div className="collapse-content">
            <div className="pt-2">
              <FollowedAuthors />
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="collapse collapse-arrow bg-base-200/50 rounded-xl border border-base-300/50">
          <input type="radio" name="accordion" id={`chapters-${id}`} />
          <div className="collapse-title flex items-center gap-3 p-4 font-medium hover:bg-base-200/70 transition-colors duration-200">
            <Library className="w-5 h-5 text-secondary" />
            <span>Your Chapters</span>
          </div>
          <div className="collapse-content">
            <div className="pt-2">
              <Chapters />
            </div>
          </div>
        </div>

        {/* Journal Section */}
        <div className="collapse collapse-arrow bg-base-200/50 rounded-xl border border-base-300/50">
          <input type="radio" name="accordion" id={`journal-${id}`} />
          <div className="collapse-title flex items-center gap-3 p-4 font-medium hover:bg-base-200/70 transition-colors duration-200">
            <Bookmark className="w-5 h-5 text-accent" />
            <span>Your Bookmarks</span>
          </div>
          <div className="collapse-content">
            <div className="pt-2">
              <Journal />
            </div>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="pt-4 border-t border-base-300/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-error/10 hover:bg-error/20 text-error hover:text-error-focus transition-all duration-200 group border border-error/20"
          aria-label="Logout from your account"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
