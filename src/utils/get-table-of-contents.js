export default page => {
  let out = []

  try {
    const { tableOfContents } = page
    out = tableOfContents.items[0].items
  } catch (error) {}

  return out
}
