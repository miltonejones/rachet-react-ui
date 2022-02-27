import React from 'react';
import {
  Alert, //
  Avatar, //
  Backdrop,
  Box, //
  Button, //
  Card, //
  Center,
  Collapse,
  Chip, //
  Dialog,
  Divider,
  Flex,
  Frame,
  IconButton, //
  Inspector,
  List,
  Menu,
  Select,
  Switch, //
  TextBox, //
  Typography, //
  css,
} from './UI';

import usePrompt from './hooks/usePrompt';
import { AlertTriangle } from '../../icons';

const UILib = {
  alert: {
    component: Alert,
    label: 'Alert',
    caption: `An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.`,
    demos: [
      {
        label: 'Info Alert',
        props: {
          severity: 'info',
          children: <>This is an Info Alert</>,
        },
      },
      {
        label: 'Error Alert',
        props: {
          severity: 'error',
          children: <>This is an error Alert</>,
        },
      },
      {
        label: 'Warning Alert',
        props: {
          severity: 'warning',
          children: <>This is a warning Alert</>,
        },
      },
      {
        label: 'Success Alert',
        props: {
          severity: 'success',
          children: <>This is a success Alert</>,
        },
      },
    ],
  },
  box: {
    label: 'Box',
    component: Box,
    caption: `The Box component serves as a wrapper component for most of the CSS utility needs.`,
    demos: [
      {
        label: 'Standard Box',
        props: {
          sx: {
            width: '300px',
            height: '300px',
            backgroundColor: 'blue',
          },
        },
      },
    ],
  },
  card: {
    label: 'Card',
    component: Card,
    caption: `Cards contain content and actions about a single subject.`,
    demos: [
      {
        label: 'Standard Card',
        props: {
          sx: { maxWidth: 300 },
          children: (
            <>
              <Typography variant="caption" mb={4}>
                Word of the Day
              </Typography>
              <Typography className="bold" mb={4} variant="body1">
                rat &bull; chet
              </Typography>
              <Typography variant="subtitle1" mb={4}>
                one who is dirty, low class, no moral values and place
                themselves in a situation of being known in a negative way.
              </Typography>
              <hr />
              <Button variant="filled">learn more</Button>
            </>
          ),
        },
      },
    ],
  },
  chip: {
    component: Chip,
    label: 'Chip',
    caption: `Chips are compact elements that represent an input, attribute, or action.`,
    demos: [
      {
        label: 'Outlined',
        props: {
          variant: 'outlined',
          children: <>Outlined</>,
        },
      },
      {
        label: 'Filled',
        props: {
          variant: 'filled',
          children: <>Filled</>,
        },
      },
      {
        label: 'Secondary',
        props: {
          variant: 'filled',
          color: 'secondary',
          children: <>Secondary</>,
        },
      },
    ],
  },
  button: {
    caption: `Buttons allow users to take actions, and make choices, with a single tap.`,
    component: Button,
    label: 'Button',
    demos: [
      {
        label: 'Outlined',
        props: {
          variant: 'outlined',
          children: 'button',
        },
      },
      {
        label: 'Filled',
        props: {
          variant: 'filled',
          children: 'button',
        },
      },
      {
        label: 'Secondary',
        props: {
          variant: 'filled',
          children: 'button',
          color: 'secondary',
        },
      },
      {
        label: 'Disabled',
        props: {
          variant: 'filled',
          children: 'button',
          color: 'secondary',
          disabled: !0,
        },
      },
    ],
  },
  iconbutton: {
    component: IconButton,
    caption: 'Icon buttons are commonly found in app bars and toolbars.',
    also: `Icons are also appropriate for toggle buttons that allow a single choice to be selected or deselected, such as adding or removing a star to an item.`,
    label: 'Icon Button',
    demos: [
      {
        label: 'Standard',
        props: {
          children: <AlertTriangle />,
        },
      },
      {
        label: 'Filled',
        props: {
          color: 'success',
          variant: 'filled',
          children: <AlertTriangle />,
        },
      },
      {
        label: 'Disabled',
        props: {
          disabled: !0,
          children: <AlertTriangle />,
        },
      },
    ],
  },
  flex: {
    component: Flex,
    label: 'Flex',
    caption: (
      <>
        Flex is <b>Box</b> with "display: flex" and comes with helpful style
        shorthand. It renders a div element
      </>
    ),
    demos: [
      {
        label: 'Standard Use',
        props: {
          children: (
            <>
              <Center w="100px" bg="green">
                <Typography>Box 1</Typography>
              </Center>
              <Flex bg="blue" size="150px">
                <Typography>Box 2</Typography>
              </Flex>
              <Box flex="1" bg="tomato">
                <Typography>Box 3</Typography>
              </Box>
            </>
          ),
        },
      },
    ],
  },
  toggle: {
    component: Switch,
    label: 'Switch',
    caption: `Switches toggle the state of a single setting on or off.`,
    demos: [
      {
        label: 'Primary',
        props: {
          color: 'primary',
          checked: true,
        },
      },
      {
        label: 'Secondary',
        props: {
          color: 'secondary',
          checked: true,
        },
      },
      {
        label: 'Success',
        props: {
          color: 'success',
          checked: true,
        },
      },
      {
        label: 'Error',
        props: {
          color: 'error',
          checked: true,
        },
      },
      {
        label: 'Unchecked',
        props: {
          color: 'error',
        },
      },
    ],
  },
  textbox: {
    label: 'Text Box',
    caption: `Text boxes let users enter and edit text.`,
    component: TextBox,
    demos: [
      {
        label: 'Standard Text Box',
        props: {
          placeholder: `It's really just an input`,
        },
      },
      {
        label: 'Disabled Text Box',
        props: {
          disabled: !0,
          placeholder: `Easily disabled`,
        },
      },
      {
        label: 'Populated Text Box',
        props: {
          value: `When it has some text`,
        },
      },
      {
        label: 'Multiple Rows',
        props: {
          value: `TODO: add some longer text`,
          multiple: !0,
          rows: 4,
        },
      },
    ],
  },
  typo: {
    component: Typography,
    label: 'Typography',
    caption:
      'Use typography to present your design and content as clearly and efficiently as possible.',
    demos: [
      {
        label: `"body1"`,
        props: {
          variant: 'body1',
          children: 'How now brown cow?',
        },
      },
      {
        label: `"body2"`,
        props: {
          variant: 'body2',
          children: 'How now brown cow?',
        },
      },
      {
        label: `"subtitle1"`,
        props: {
          variant: 'subtitle1',
          children: 'How now brown cow?',
        },
      },
      {
        label: `"button"`,
        props: {
          variant: 'button',
          children: 'How now brown cow?',
        },
      },
    ],
  },
};

export {
  Alert, //
  Avatar,
  Backdrop,
  Box, //
  Button, //
  Card, //
  Center,
  Collapse,
  Chip, //
  Dialog,
  Divider,
  Flex,
  Frame,
  IconButton, //
  Inspector,
  List,
  Menu,
  Select,
  Switch, //
  TextBox, //
  Typography, //
  UILib,
  usePrompt,
  css,
};
