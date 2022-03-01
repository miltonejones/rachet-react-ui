import React from 'react';
import searchValues from "../assets/component-list.json";
 

import { useSnackbar } from '../components/UI';
 

export default function useApp() {
 
  const search = param => {
    return ((found) => {
      if (!param) return [];
      searchValues.map(node => {
        node.components.map(c => found.push(`${node.category}: ${c}`))
      })
      console.log ({param})
      return found.filter(f => f.toLowerCase().indexOf(param.toLowerCase()) > -1);
    })([])
  }
  
 
  const { snackState, say } = useSnackbar();
 
  return { snackState, say, search };
}
