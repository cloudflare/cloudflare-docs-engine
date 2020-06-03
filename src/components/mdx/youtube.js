import React from "react"

const defaultAspectRatio = 16 / 9

export default props => {
  const style = {
    "--aspect-ratio": `calc(${ props.aspectRatio || defaultAspectRatio })`
  }

  return (
    <figure>
      <div className="AspectRatio" style={style}>
        <iframe
          className="AspectRatio--content"
          src={`https://www.youtube.com/embed/${props.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen/>
      </div>
    </figure>
  )
}
