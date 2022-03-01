import React from 'react';
 
import {
  AppBar,
  Flex,
  Card,
  Button,
  IconButton,
  Center,
  Box,
  Divider,
  Typography,
  css,
  Avatar,
  Dialog,
  Backdrop,
  List,
  Snackbar,
  Spacer,
  Stack,
  Paper,
  Frame,
  TextBox,
  Switch,Chip,
  useComponentState,
} from './components/UI';  
import useApp from './hooks/useApp';
import { ChevronRight } from './icons';
import { Smiley, Play, Clipboard, Github, Search, Lock,  Dribble,SkipBack,SkipFwd } from './icons';

import './style.css';




export default function App() {
  const { search } = useApp()
  const {state, toggle, setState} = useComponentState({open: !1, c1: !0, c2: !0, c3: !0});
  const { open, param, results, c1, c2, c3 } = state;
  const maxWidth = 345;
  return (
    <div  className="App">
     <AppBar className="toolbar">
       <IconButton ml={12} mr={3}>
         <Smiley />
       </IconButton>
       <Box className="toolbar-button logo" mr={10}>Rachet-UI</Box>
       <Box  onClick={() => window.open('http://docs.ratchet-ui.com')} className="toolbar-button">Docs</Box>
       <Box  onClick={() => window.open('http://sql.ratchet-ui.com')}  className="toolbar-button">Ratchet-SQL</Box>
       <Box  onClick={() => window.open('http://sql.ratchet-ui.com')}  className="toolbar-button">Stackblitz</Box>
  
       <Spacer />
        <Flex onClick={() => toggle('open')} align="center" className="search-box">
          <Search style={{width:16, height: 16, marginRight: 8}}/>
          Search...
          <Spacer />
          <Box className="search-k" >Ctrl+K</Box>
        </Flex>
        <IconButton onClick={() => window.open('https://github.com/miltonejones/rachet-react-ui')} mr={16} ml={2} size="small">
          <Github style={{width:16, height: 16}} />
        </IconButton>
     </AppBar>


    <Flex className="workspace">
      <Stack className="banner">
        <Typography className="bold" variant="h1" mb={4}>The React Component Library literally nobody asked for.</Typography>
        <Typography mt={2} variant="body1"> Ratchet-UI provides a light-weight, customizable, and open-source library of component starter classes, 
        enabling you to create the framework you need for your application.</Typography>
      
        <Flex mt={12}>
          <Flex align="center" className="git-button">
             Get Started <Spacer /> <ChevronRight />
          </Flex>
            <Spacer />
          <Flex className="git-box">
            <Box className="git-url">
              git clone https://github.com/miltonejones/ratchet-component-library.git
            </Box>
            <Clipboard />
          </Flex>
        </Flex>
      </Stack>
      <Spacer />
      <Frame p={2} className="preview on" offset={18}>
        <Flex >

        <Stack mr={2}>
            <Paper  mb={2} style={{width: maxWidth}}>
              <Flex>
                <img style={{width:100, height: 100}} src="https://images.genius.com/d8feea72ac4d25343bdaccd07231fb11.593x593x1.png" alt="photo"/>
                <Stack ml={3}>
                  <Typography mb={1} variant="body2">Demons</Typography>
                  <Typography variant="subtitle1">hayley kiyoko</Typography>
                  <Center mt={3} justify="space-between" sx={{width: 220}}> 
                      <Box ml={4}>
                        <IconButton><SkipBack  style={{width:20, height:20}}/></IconButton> 
                      </Box>
                      <Box> 
                        <IconButton variant="outlined" size="large"><Play /></IconButton> 
                      </Box>
                      <Box mr={4}> 
                        <IconButton ><SkipFwd style={{width:20, height:20}} /></IconButton>
                      </Box>
                  </Center>
                </Stack>
              </Flex>
            </Paper>


            <Card sx={{ maxWidth }}>
              <img style={{width: '100%', height: 'auto'}} src="https://cdn.britannica.com/20/93520-050-3E663489/Puma.jpg" alt="puma" />
              <Stack>
              <Typography mt={2} variant="body1" className="bold">puma</Typography>
              <Typography mt={2}  variant="subtitle1">mammal species</Typography>
              <Typography mt={2}  variant="caption">Alternate titles: American lion, Felis concolor, Mexican lion, Puma concolor, catamount, cougar, mountain lion</Typography>
              <Divider />

              <Flex>
              <Spacer />
              <Chip variant="filled">Related subjects <ChevronRight /> </Chip>

              </Flex>
              </Stack>
            </Card>
        </Stack>

        <Stack spacing={2}>


          <Paper mb={2} sx={{ maxWidth }} className="demo-paper">
            <Stack>
              <Flex align="center" mb={2}>  
              <IconButton><Lock /> </IconButton>Check security status</Flex>  
              <IconButton><Dribble /></IconButton>
              <Typography mt={2} variant="subtitle1">Check the Storybook to learn more about our components and tools</Typography>
              <Flex mt={3} >
                <Avatar src="https://cdn.mainichi.jp/vol1/2022/01/11/20220111p2a00m0li025000p/9.jpg?1" 
                size="large" variant="rounded">a</Avatar>
                <Stack ml={2}>
                  <Typography mb={1} variant="caption">Hatsune Miku wedding confirmed</Typography>
                  <Typography variant="subtitle1  ">Rumors of Donald Duck lawsu...</Typography>
                </Stack>
              </Flex>
            </Stack>
          </Paper>

          <Paper mb={2} sx={{ maxWidth }}>
            <Flex justify="space-between">
              <Switch onChange={b => setState('c1', b)} checked={c1} color="success" />
              <Switch onChange={b => setState('c2', b)} checked={c2} color="warning" />
              <Switch  color="error" />
              <Switch onChange={b => setState('c3', b)} checked={c3} color="error" />
            </Flex>
          </Paper>


          <Card sx={{ maxWidth }}>
            <List 
            header={<Box  p={2}><Typography variant="caption">To-do List</Typography></Box>}
            items={['apples', 'pears', 'oranges', 'world peace'].map(x=><Box key={x} p={2}>{x}</Box>)} />
            <Flex>
              <Spacer />
              <Button mt={2} variant="filled" color="success">complete</Button>
            </Flex>
          </Card>
        </Stack>

        </Flex>

      </Frame>
    </Flex>




    <Dialog onClose={() => toggle('open')} open={open} width="500px" height="500px">
      <Typography variant="subtitle" className="bold"  mt={2} mb={2} >
        Search the component list
      </Typography>

      <Flex>
        <TextBox fullWidth placeholder="Enter component name or category" value={param} onChange={(v)  =>setState('results', search(v.target.value))} />
      </Flex>
      <Divider/>
      {!!results && (
      <Stack>
        <Typography variant="caption" mb={2} >
           Results from the <a href="http://docs.ratchet-ui.com" target="_blank">Ratchet-UI Documentation</a>
        </Typography>

        <List items={results.map(b => (
            <Typography variant="body2" className="link" onClick={() => linkOf(b)} mt={2} mb={2} >
              {b}
            </Typography>
          ))} />
      </Stack>
      )}
    </Dialog>
    </div>
  );
}


// https://docs.ratchet-ui.com/?path=/docs/components-data-display--avatar

const linkOf = (desc) => {
  const array = desc.split(':')
  const cat = array[0].trim().replace(/\s/g, '-')
  const com = array[1].trim().replace(/\s/g, '-')
  const uri = `https://docs.ratchet-ui.com/?path=/docs/components-${cat}--${com}`;
  window.open(uri)
};