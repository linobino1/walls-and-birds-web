import { cn } from '@/util/cn'

type Props = React.ComponentProps<'div'> & {
  size?: 'sm' | 'md' | 'lg'
}

export const Gutter = ({ size = 'md', className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4',
        {
          'max-w-[760px]': size === 'sm',
          'max-w-[850px]': size === 'md',
        },
        // {
        //   'bg-blue-500/10': size === 'lg',
        //   'bg-pink-500/10': size === 'md',
        //   'bg-green-500/10': size === 'sm',
        // },
        className,
      )}
      {...props}
    />
  )
}
