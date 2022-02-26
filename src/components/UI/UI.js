import React from 'react';
import './UI.css';
import { convertProps, css, Tw, Cw, THEME_SPACING} from './Themer'
import {AlertCircle, CheckCircle, AlertTriangle, Info} from '../../icons'

/****************************************************************************************************
 *                                          RACHET UI
 *                            a component library for the rest of us
 ****************************************************************************************************/
 

/****************************************************************************************************
 *                                           TextBox
 ****************************************************************************************************/
export function TextBox({ fullWidth, style, multiple, value, rows = 3,...props }) {
  const width = fullWidth ? '100%' : 'inherit';
  const args = {
    className: 'ui-base text-box', 
    rows,
    value,
    style: {width, ...style, ...convertProps(props)},
    ...props
  }
  if (multiple) {
    return <textarea {...args}>{value}</textarea>
  }
  return (
    <input {...args} />
  );
}

/****************************************************************************************************
 * Card
 * uses a FIELDSET tag to allow for fancy labels
 ****************************************************************************************************/
export function Card({ children, style, ...props }) {
  return (
    <Tw {...props}>
      <fieldset 
        {...props} 
        className="card" 
        style={{...style, ...convertProps(props)}}>{children}</fieldset>
    </Tw>
  );
}

/****************************************************************************************************
 *                                            Button
 ****************************************************************************************************/
export function Button({children, onClick, ...props }) {
  return (
    <Tw {...props}>
      <Center {...props} 
        className="ui button" 
        style={{...convertProps(props)}}
        onClick={e => !props.disabled && onClick && onClick(e)} >
        {children}
      </Center>
    </Tw>
  );
}

/****************************************************************************************************
 * IconButton
 * a circle with an onClick event...whew that's a toughie
 ****************************************************************************************************/
export function IconButton ({children, onClick, size="medium", ...props}) {
  return <Flex 
      onClick={e => !props.disabled && onClick && onClick(e)} 
      justify="center" 
      align="center" 
      className="ui ui-size icon-button" 
      {...props} 
      size={size}
      style={...convertProps(props)}>{children}</Flex> 
}

/****************************************************************************************************
 * Flex
 * multi-purpose little div-box, very useful
 ****************************************************************************************************/
export function Flex({
  justify: justifyContent,
  align: alignItems,
  xs ,
  spacing = 0,
  style,
  wrap,
  column,
  children,
  ...props
}) {
  const width = !!xs ? `${(xs / 12) * 100}%` : null;
  const flexWrap = wrap ? 'wrap' : 'nowrap';
  const margin = spacing * THEME_SPACING + 'px';
  const flexDirection = column ? 'column' : 'row';
  const styles = { 
    display: 'flex', 
    flexDirection,
    justifyContent, 
    alignItems, 
    width, 
    margin, 
    flexWrap, 
    ...style, 
    ...convertProps(props) 
  }; 
  return (
    <Tw {...props} width={width}><div className={css({'ui-text': 1, flex: 1, [props.className] : 1})} {...props} style={styles}>{children}</div></Tw>
  );
}

/****************************************************************************************************
 *                                           Center
 ****************************************************************************************************/
export function Center({children, ...props}) {
  return <Flex justify="center" align="center" {...props}>{children}</Flex>
}

/****************************************************************************************************
 *                                           Backdrop
 ****************************************************************************************************/
export function Backdrop({ open, onClose }) {
  return <Box onClick={ onClose } className={css({ backdrop: 1, open })} />
}

/****************************************************************************************************
 *                                           Dialog
 ****************************************************************************************************/
export function Dialog({children, open, onClose, width = "400px", height = "200px", ...props}) {
  return <Tw {...props} width={width} height={height}>
  <Backdrop open={open} onClose={onClose}/>
  <Box className={css({ dialog: 1, open })} {...props}>{children}</Box>
  </Tw>
}

/****************************************************************************************************
 *                                           Avatar
 ****************************************************************************************************/
export function Avatar({children, src, alt, variant="circle", ...props}) {
  const image = <img src={src} alt={alt} />
  return <Center className="ui ui-size avatar" variant={variant} {...props}>{!!src ? image : children}</Center>
}

/****************************************************************************************************
 *                                            Chip
 ****************************************************************************************************/
export function Chip({children, icon, ...props}) {
  return <Flex {...props} className="ui chip" style={convertProps(props)}>
    {!!icon && <Box>{icon}</Box>}
    {children}</Flex>
}

/****************************************************************************************************
 *                                          Collapse
 ****************************************************************************************************/
export function Collapse ({height, on, children, noscroll, className, ...props}) {
  const [openHeight, setOpenHeight] = React.useState(height);
  const ref = React.createRef();
  React.useEffect(() => {
    if (!ref.current) return ;
    const { offsetHeight } = ref.current ;
    if (!!height || !offsetHeight || !on) {
      height !== openHeight && setOpenHeight(height)
      return;
    };
    setOpenHeight(offsetHeight + 'px') ;
  }, [ref, on, height])
  return <Cw ref={ref} style={{'--open-height': openHeight }}
    >
    <div className={css({collapse: 1, on, [className]: 1, noscroll})} { ...props}>{children}</div>
    </Cw>
}
 
/****************************************************************************************************
 *                                            List
 ****************************************************************************************************/
export function List ({items, children, dense, header, footer, ...props}) {
  return <ul className={css({list: 1, dense})} {...props} style={convertProps(props)}> 
  {!!header && <li>{header}</li>}
    {items?.map((item, i) => <li key={i}>{item}</li>)}
    {children}
  {!!footer && <li>{footer}</li>}
  </ul>
}

/****************************************************************************************************
 *                                Grid (still working on this one)
 ****************************************************************************************************/
export function Grid ({columns, children, ...props}) {
  if (!children) return <i />
  const width = `calc(${1 / columns * 100}% - 6px)`
  return <div className="grid" {...props} style={convertProps(props)}> 
    {children.map((c,i) => <div className="cell" key={i} style={{width}}>[[{c}]]</div>)}
  </div>
}

/****************************************************************************************************
 *                                            Select
 ****************************************************************************************************/
export function Select ({options = [], value, label, ...props}) {
  return ( 
  <select style={convertProps(props)} {...props} className="select ui-base">
    <option>{label}</option>
  {options.map((o,i) => <option selected={o===value} value={o}>{o}</option>)}
  </select>)
}

/****************************************************************************************************
 *                                    Box (suprisingly useful)
 ****************************************************************************************************/
export function Box ({children, ...props}) {
  return <div style={convertProps(props)} { ...props} >{children}</div>
}
 
/****************************************************************************************************
 *                                            Alert
 ****************************************************************************************************/
export function Alert ({children, severity = 'info', icon: Photo,  ...props}) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error:  AlertCircle
  }
  const filters = {
    info: 'invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)',
    success: 'invert(0.5) sepia(.4) saturate(5) hue-rotate(75deg)',
    warning: 'invert(0.5) sepia(.8) saturate(5) hue-rotate(15deg)',
    error: 'invert(0.2) sepia(.7) saturate(12) hue-rotate(0deg)'
  }
  const Icon = Photo || icons[severity];
  const filter  =  filters[severity]
  return <Tw {...props} severity={severity} >
    <Box style={{...convertProps(props), display: 'flex', alignItems: 'center'}} { ...props} className="alert">
      <Icon style={{  marginRight: 12, filter }}/>
      {children}</Box>
    </Tw>
}


/****************************************************************************************************
 *                                             Switch
 ****************************************************************************************************/
export function Switch ({onChange, ...props}) {
  return <Tw {...props} variant="filled">
  <div 
    onClick={() => onChange && !props.disabled && onChange(!props.checked)} 
    className="switch"
    style={convertProps(props)} 
    { ...props} >
    <div className="knob-o"/>
    <div className="knob-i"/>
    <div className="bar"/>
  </div></Tw>
}


/****************************************************************************************************
 *                                          Typography
 ****************************************************************************************************/
export function Typography ({variant = 'body1', children, ...props}) {
  return <Tw {...props}>
  <div  
    style={convertProps(props)} 
    { ...props} 
    className={css({"typo": 1, [variant]: 1, [props.className]: 1})}>
   {children}
  </div></Tw>
}




export { css } 