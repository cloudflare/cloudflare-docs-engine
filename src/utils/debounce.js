export default (fn, ms) => {
  let timer

  return () => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}