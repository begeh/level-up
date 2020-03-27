export default function success({ apprentice, mentor, questTitle, nodes }, user_id, mentor_id) {
  console.log(nodes)
  // 5 node quest
  if (nodes.length === 5) {

    if (user_id === mentor_id) {
      return `
    In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. 
    
    The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a warmup to the intrepid adventurer. 
    
    ${apprentice}’s second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge but it wasn’t an impossible task. 
    
    “${nodes[2].title.charAt(0) + nodes[2].title.slice(1).toLowerCase()}?” ${apprentice} gushed. “That’s my breakfast routine”. 
    
    “I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[3].title.toLowerCase()}.” 
    
    Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy task, but like before, not an impossible one. 
    
    At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[4].title.toLowerCase()}. Days turned into weeks and weeks turned into days.
     
    However, ${apprentice} persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. 
    
    The cool morning breeze greeted ${apprentice}’s weary face as if it slipped in an extra reward to the completion of the quest. A glorious end to a glorious journey.`

    } else {

      return `
    In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. 
    
    With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, 
    
    was but a warmup to the dynamic duo. Their second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge but it wasn’t an impossible task for the two.
    
    “${nodes[2].title.charAt(0) + nodes[2].title.slice(1).toLowerCase()}?” ${apprentice} gushed. “That’s my breakfast routine”. 
    
    “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[3].title.toLowerCase()}.” 
    
    Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task, but like before, not an impossible one.

    At long last, the two reached the final phase of their arduous quest, which was to ${nodes[4].title.toLowerCase()}. Days turned into weeks and weeks turned into days. 
    
    However, the two persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. 
    
    The cool morning breeze greeted their weary faces as if they slipped in an extra reward to the completion of their quest. A glorious end to a glorious journey.`

    }
  } else if (nodes.length === 4) {
    if (user_id === mentor_id) {
      return `
    In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. 
    
    The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a warmup to the intrepid adventurer. 
    
    ${apprentice}’s second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge but it wasn’t an impossible task. 
    
    “I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[2].title.toLowerCase()}.” 
    
    Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy task, but like before, not an impossible one. 
    
    At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[3].title.toLowerCase()}. Days turned into weeks and weeks turned into days.
     
    However, ${apprentice} persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. 
    
    The cool morning breeze greeted ${apprentice}’s weary face as if it slipped in an extra reward to the completion of the quest. A glorious end to a glorious journey.`

    } else {

      return `
    In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. 
    
    With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, 
    
    was but a warmup to the dynamic duo. Their second objective, which was to ${nodes[1].title.toLowerCase()} was a tough challenge but it wasn’t an impossible task for the two.
    
    “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[2].title.toLowerCase()}.” 
    
    Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task, but like before, not an impossible one.

    At long last, the two reached the final phase of their arduous quest, which was to ${nodes[3].title.toLowerCase()}. Days turned into weeks and weeks turned into days. 
    
    However, the two persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. 
    
    The cool morning breeze greeted their weary faces as if they slipped in an extra reward to the completion of their quest. A glorious end to a glorious journey.`

    }
  } else if (nodes.length === 3) {
    if (user_id === mentor_id) {
      return `In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. 
    
    The first step of ${apprentice}’s quest, which was to ${nodes[0].title.toLowerCase()}, was but a warmup to the intrepid adventurer. 
    
    “I should take this as an opportunity to catch my breath and plan ahead because my next task is to ${nodes[1].title.toLowerCase()}.” 
    
    Hence, ${apprentice} used the extra time to prepare for the next task, which was no easy task, but like before, not an impossible one. 
    
    At long last, ${apprentice} reached the final phase of the arduous quest, which was to ${nodes[2].title.toLowerCase()}. Days turned into weeks and weeks turned into days.
     
    However, ${apprentice} persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. 
    
    The cool morning breeze greeted ${apprentice}’s weary face as if it slipped in an extra reward to the completion of the quest. A glorious end to a glorious journey.`

    } else {

      return `
    In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. 
    
    With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${nodes[0].title.toLowerCase()}, 
    
    was but a warmup to the dynamic duo.
    
    “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${nodes[1].title.toLowerCase()}.” 
    
    Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task, but like before, not an impossible one.

    At long last, the two reached the final phase of their arduous quest, which was to ${nodes[2].title.toLowerCase()}. Days turned into weeks and weeks turned into days. 
    
    However, the two persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. 
    
    The cool morning breeze greeted their weary faces as if they slipped in an extra reward to the completion of their quest. A glorious end to a glorious journey.`

    }
  }
}