export interface ImageProps {
  className?: string
  link?: string
  imageLabel?: {
    visible: boolean
    title: string
    url: string
    text?: string
    position: string
  }
  image: Image
  sizes?: string
}

export interface Image {
  url: string
  alt: string
  renditions?: { [width: string]: string }
}
