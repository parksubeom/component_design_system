import React from "react";
import { Header } from "./components/ui/Header";
import { ManagementPage } from "./pages/ManagementPage";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./styles/components.css";

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      <Header />
      <ThemeProvider defaultTheme="system" storageKey="bds-theme">
        <ManagementPage />
      </ThemeProvider>
    </div>
  );
};
