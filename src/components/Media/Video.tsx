type VideoMediaProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string
  className?: string
  onClick?: () => void
}

export const VideoMedia: React.FC<VideoMediaProps> = ({
  src,
  className,
  onClick,
  ...videoProps
}) => {
  return (
    <video
      autoPlay
      {...(className && { className })}
      controls={false}
      loop
      muted
      onClick={onClick}
      playsInline
      {...videoProps}
    >
      <source src={src} />
    </video>
  )
}
