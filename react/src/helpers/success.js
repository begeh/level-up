export default function success({apprentice, mentor, questTitle, node1, node2, node3, node4, node5}){

  return `
  In a distant land, far beyond yonder, a noble adventure who goes by the name of ${apprentice} sets off on a journey to ${questTitle.toLowerCase()}. With their trusted mentor, ${mentor} by their side, the odds were in their favour. The first step of their quest, which was to ${node1.toLowerCase()}, was but a warmup to the dynamic duo. Their second objective, which was to ${node2.toLowerCase()} was a tough challenge but it wasn’t an impossible task for the two.
  
  “${node3.charAt(0) + node3.slice(1).toLowerCase()}?” ${apprentice} gushed. “That’s my breakfast routine”. “Take this as an opportunity to catch your breath and plan ahead because your next task is to ${node4.toLowerCase()}.” Heeding ${mentor}’s wise words, ${apprentice} used the extra time they had to prepare for the next task, which was no easy task, but like before, not an impossible one.

  At long last, the two reached the final phase of their arduous quest, which was to ${node5.toLowerCase()}. Days turned into weeks and weeks turned into days. However, the two persevered with strenuous endeavor and before they knew it, they accomplished the unimaginable. The Sun peaked in the horizon. The cool morning breeze greeted their weary faces as if they slipped in an extra reward to the completion of their quest. A glorious end to a glorious journey.`
}