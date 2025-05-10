import { cn } from '@/util/cn'

type Props = React.ComponentProps<'div'> & {
  size?: 'md'
}

export const Gutter = ({ size, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'px-[3vw]',
        {
          'w-full': size === 'md',
        },
        className,
      )}
      {...props}
    />
  )
}
