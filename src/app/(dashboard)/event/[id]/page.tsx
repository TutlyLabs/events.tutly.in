import { getEvent } from '@/actions/events';
import React from 'react'

async function page({ params }: { params: { id: string } }) {
    let id = params.id.split("%")[1];
    id=id.substring(2);
    const event = await getEvent(id);
  return (
    <pre>{JSON.stringify(event,null,2)}</pre>
  )
}

export default page