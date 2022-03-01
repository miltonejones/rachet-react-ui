import React from 'react';
 
import {
  AppBar,
  Flex,
  IconButton,
  Box,
  Frame,
  Typography,
  css,
  Avatar,
  Dialog,
  Backdrop,
  Snackbar,
  Spacer,
  Spinner,
  Menu,
} from './components/UI/UI';  
import useApp from './hooks/useApp';
import { Smiley, Close, Hamburger, Dribble } from './icons';

import './style.css';

export default function App() {
 
  return (
    <div  className="App">
     <AppBar />

    </div>
  );
}
