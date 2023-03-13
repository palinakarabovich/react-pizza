import React from "react"
import ContentLoader from "react-content-loader"

const PizzaLoaderSkeleton: React.FC = (props) => (
  <ContentLoader
    className= 'pizza-block'
    speed={2}
    width={280}
    height={455}
    viewBox="0 0 280 455"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="282" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="321" rx="10" ry="10" width="280" height="74" />
    <rect x="0" y="416" rx="5" ry="5" width="100" height="27" />
    <rect x="130" y="403" rx="15" ry="15" width="150" height="52" />
  </ContentLoader>)

export default PizzaLoaderSkeleton;