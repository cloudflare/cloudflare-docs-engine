exports.onRouteUpdate = ({ location }) => {
  const domElem = document.querySelector(`link[rel='canonical']`)
  const existingValue = domElem.getAttribute(`href`)
  const baseProtocol = domElem.getAttribute(`data-baseProtocol`)
  const baseHost = domElem.getAttribute(`data-baseHost`)
  
  location.pathname += !location.pathname.endsWith('/') ? '/' : '';
  
  let value = `${baseProtocol}//${baseHost}${location.pathname}${location.hash}`
  if (existingValue && baseProtocol && baseHost) {

    domElem.setAttribute(`href`, `${value}`)
  }
}
