import { convertDate } from './convertDate';

export default function fail({ apprentice, mentor, questTitle, nodes, dateStart, dateEnd }, num_completed_nodes, user_id, mentor_id) {

  let story = null;
  let story_parts = null;

  //fail story line to append at end of completed node tasks
  let fail_line = null;

  const date = (new Date(dateEnd)).getTime() - (new Date(dateStart)).getTime();

  console.log("The number of completed is ", num_completed_nodes)

  //converts times spent on quest into readable time interval (e.g. seconds, minutes, days, years, etc.)
  const experience = convertDate(date);
  if (nodes.length === 5) {
    if (mentor_id === user_id) {

      story = [`In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. `];

      story_parts = [
        `The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was a chance to test the waters.`, 
        
        `${apprentice}’s second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge.`,
        
        `“${nodes[2].title.charAt(0) + nodes[2].title.slice(1).toLowerCase()}?” ${apprentice} gushed. That can prove quite tricky.”`, 
        
        `“I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[3].title.toLowerCase()}.”`,
        
        `Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy task.`,
        
        `At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[4].title.toLowerCase()}. Days turned into weeks and weeks turned into days.`
      ]

      fail_line = ` It appeared as if lady luck had turned a blind eye to ${apprentice}’s fate. The expected became the unexpected and it was soon clear to ${apprentice} that it was simply not the right time to complete the quest. It was a rough for ${apprentice} to face the music in their head but they accepted the reality of the situation. ${apprentice} took this experience as a marker... a marker of progress from when they had started. For should ${apprentice} decide to partake in this quest again, they will be ${experience} ahead. Until then, ${apprentice} will take as much time as they need to reflect on the journey they have just taken.`;

    } else {

      story = [`In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. With their trusted mentor, ${mentor} by their side, the odds were in their favour.`];

      story_parts = [
        `The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, was a chance to test the waters.`,
        
        `Their second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge.`,
        
        `“${nodes[2].title.charAt(0) + nodes[2].title.slice(1).toLowerCase()}?” ${apprentice} gushed. “That can prove quite tricky”.`,
        
        `“Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[3].title.toLowerCase()}.”
        
        Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task.`,
    
        `At long last, the two reached the final phase of their arduous quest, which was to ${nodes[4].title.toLowerCase()}. Days turned into weeks and weeks turned into days. `
      ];


      fail_line = ` It appeared as if lady luck had turned a blind eye to their fate, however. The expected became the unexpected and it was soon clear to ${mentor} that it was simply not the right time for ${apprentice} to ${questTitle.toLowerCase()}. Without any delay, ${mentor} broke the news to their pupil. It was a rough for ${apprentice} to face the music but ${apprentice} accepted the reality of the situation. “Fear not. Take as much time as you need to vent but do not dwell forever in today’s failure. Instead, take it as a marker... a marker for progress from where you started. For should you decide to partake this quest again, you would be ${experience} ahead. That my friend, is the meaning of experience.” A smile crept upon ${apprentice}’s face as they heeded their mentor’s words and looked forward to the day they decide to ${questTitle.toLowerCase()} again.`;

    }
  } else if (nodes.length === 4) {
    if (mentor_id === user_id) {

      story = [`In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. `];

      story_parts = [
        `The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a chance to test the waters.`, 
    
        `${apprentice}’s second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge.`, 
        
        `“I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[2].title.toLowerCase()}.”
        
        Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy task.`, 
        
        `At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[3].title.toLowerCase()}. Days turned into weeks and weeks turned into days.`
      ]

      fail_line = ` It appeared as if lady luck had turned a blind eye to ${apprentice}’s fate. The expected became the unexpected and it was soon clear to ${apprentice} that it was simply not the right time to complete the quest. It was a rough for ${apprentice} to face the music in their head but they accepted the reality of the situation. ${apprentice} took this experience as a marker... a marker of progress from when they had started. For should ${apprentice} decide to partake in this quest again, they will be ${experience} ahead. Until then, ${apprentice} will take as much time as they need to reflect on the journey they have just taken.`;

    } else {

      story = [`In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. With their trusted mentor, ${mentor} by their side, the odds were in their favour.`];

      story_parts = [
        `The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, was a chance to test the waters.`,
        
        `Their second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge.`,
        
        `“Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[2].title.toLowerCase()}.” 
        
        Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task.`,
    
        `At long last, the two reached the final phase of their arduous quest, which was to ${nodes[3].title.toLowerCase()}. Days turned into weeks and weeks turned into days.`
      ];


      fail_line = ` It appeared as if lady luck had turned a blind eye to their fate, however. The expected became the unexpected and it was soon clear to ${mentor} that it was simply not the right time for ${apprentice} to ${questTitle.toLowerCase()}. Without any delay, ${mentor} broke the news to their pupil. It was a rough for ${apprentice} to face the music but ${apprentice} accepted the reality of the situation. “Fear not. Take as much time as you need to vent but do not dwell forever in today’s failure. Instead, take it as a marker... a marker for progress from where you started. For should you decide to partake this quest again, you would be ${experience} ahead. That my friend, is the meaning of experience.” A smile crept upon ${apprentice}’s face as they heeded their mentor’s words and looked forward to the day they decide to ${questTitle.toLowerCase()} again.`;

    }
  } else if (nodes.length === 3) {
    if (mentor_id === user_id) {

      story = [`In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. `];

      story_parts = [
        `The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was a chance to test the waters.`,

        `“I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[1].title.toLowerCase()}.”

        Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy task, but like before, not an impossible one.`,

        `At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[2].title.toLowerCase()}. Days turned into weeks and weeks turned into days.`
      ]

      fail_line = ` It appeared as if lady luck had turned a blind eye to ${apprentice}’s fate. The expected became the unexpected and it was soon clear to ${apprentice} that it was simply not the right time to complete the quest. It was a rough for ${apprentice} to face the music in their head but they accepted the reality of the situation. ${apprentice} took this experience as a marker... a marker of progress from when they had started. For should ${apprentice} decide to partake in this quest again, they will be ${experience} ahead. Until then, ${apprentice} will take as much time as they need to reflect on the journey they have just taken.`;

    } else {

      story = [`In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. With their trusted mentor, ${mentor} by their side, the odds were in their favour.`];

      story_parts = [
        `The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, was a chance to test the waters.`,

        `“Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[1].title.toLowerCase()}.” 

        Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task, but like before, not an impossible one.`,

        `At long last, the two reached the final phase of their arduous quest, which was to ${nodes[2].title.toLowerCase()}. Days turned into weeks and weeks turned into days.`
      ];


      fail_line = ` It appeared as if lady luck had turned a blind eye to their fate, however. The expected became the unexpected and it was soon clear to ${mentor} that it was simply not the right time for ${apprentice} to ${questTitle.toLowerCase()}. Without any delay, ${mentor} broke the news to their pupil. It was a rough for ${apprentice} to face the music but ${apprentice} accepted the reality of the situation. “Fear not. Take as much time as you need to vent but do not dwell forever in today’s failure. Instead, take it as a marker... a marker for progress from where you started. For should you decide to partake this quest again, you would be ${experience} ahead. That my friend, is the meaning of experience.” A smile crept upon ${apprentice}’s face as they heeded their mentor’s words and looked forward to the day they decide to ${questTitle.toLowerCase()} again.`;

    }
  }
  //cycles through story_parts and adds stories for the nodes that were completed prior to abandoning mission
  for (let i = 0; i < num_completed_nodes; i++) {
    console.log("This is what i is ", i)
    story.push(story_parts[i]);
  };

  console.log(`Number of nodes completed ${num_completed_nodes} and Days of experience ${experience}`);

  story.push(fail_line);

  story = story.join('\r\n');

  console.log(`Fail Story is ${story}`);

  return story;

}