import { getAllTags, getEvents } from '@/actions/events';
import Hackathon from '@/components/hackathons';
import React from 'react';

async function Hackathons() {
  const events = await getEvents();

  const tags = await getAllTags();

  return (
    <div>
      <Hackathon events={events} tags={tags} type="HACKATHON"/>
    </div>
  )
}

export default Hackathons