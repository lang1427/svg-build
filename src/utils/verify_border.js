export const verify_borderChildren = (v_dom) => {
  if (!!v_dom.children) {
    return (v_dom.children.length == 0 || v_dom.children.length == 1) ? true : console.error('There can be only one child element or no child element in the selector element')
  }
  return console.error("not fount selector element")
}