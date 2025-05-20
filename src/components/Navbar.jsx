import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // ícone do menu
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const links = ['Início', 'História', 'Sobre', 'Downloads'];

const wordVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 }
  })
};

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        top={0}
        display="flex"
        sx={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(8px)',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Título com animação palavra por palavra */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {'Animosity'.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginRight: '2px',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </Box>

          {/* Navegação: Links no desktop, menu no mobile */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{ width: 200 }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  <List>
                    {links.map((text) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {links.map((text, index) => (
                <motion.div
                  key={text}
                  whileHover={{ scale: 1.1, color: 'white' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 500,
                      transition: '0.3s',
                      '&:hover': {
                        color: 'white',
                      }
                    }}
                  >
                    {text}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

    
    </>
  );
}

export default Navbar;
