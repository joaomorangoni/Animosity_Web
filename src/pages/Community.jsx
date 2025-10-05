import React, { useState } from "react";
import { Card, CardContent, CardActions, Button, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { Bolt } from "lucide-react";
import axios from "axios";
import "./Community.css";
import Sidebar from "../components/Sidebar.jsx";

export default function Community({ user }) {


  return (
    <div className="community-container">
      <Sidebar />
      </div>


  );
}
