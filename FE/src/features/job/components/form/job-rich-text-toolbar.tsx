import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function JobRichTextToolbar() {
  return (
    <div className='bg-muted/10 -mt-2 flex gap-0.5 rounded-b-md border border-t-0 border-border px-2 py-1'>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-foreground h-7 w-7'
      >
        <Icons.bold className='h-3.5 w-3.5' />
      </Button>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-foreground h-7 w-7'
      >
        <Icons.italic className='h-3.5 w-3.5' />
      </Button>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-foreground h-7 w-7'
      >
        <Icons.underline className='h-3.5 w-3.5' />
      </Button>
      <div className='bg-border mx-1 my-1.5 w-px' />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-foreground h-7 w-7'
      >
        <Icons.list className='h-3.5 w-3.5' />
      </Button>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-foreground h-7 w-7'
      >
        <Icons.listNumbers className='h-3.5 w-3.5' />
      </Button>
      <div className='bg-border mx-1 my-1.5 w-px' />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground hover:text-foreground h-7 w-7'
      >
        <Icons.link className='h-3.5 w-3.5' />
      </Button>
    </div>
  );
}
