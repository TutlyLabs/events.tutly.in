import { getEvent } from '@/actions/events';
import Description from '@/components/Description.tsx';
import React from 'react'

async function page({ params }: { params: { id: string } }) {
    let id = params?.id.split("%")[1];
    id=id?.substring(2);
    const event = await getEvent(id);
  return (
    <Description event={event}/>
  )
}

export default page