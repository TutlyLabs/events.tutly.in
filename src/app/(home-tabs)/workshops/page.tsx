import { getEvents } from '@/actions/events';
import Hackathon from '@/components/hackathons';
import React from 'react';

async function Hackathons() {
  const events = await getEvents();
  return (
    <div>
      <Hackathon events={events} type="WORKSHOP"/>
    </div>
  )
}

export default Hackathons