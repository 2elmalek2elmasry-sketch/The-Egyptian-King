/* THE EGYPTIAN KING — US seasonal event calendar
   Dates are evaluated in the visitor's local calendar. Ramadan/Eid follow the
   Islamic calendar when the browser supports Intl Islamic calendar formatting.
*/
(function(){
  const banner=document.getElementById('tek-event-banner');
  if(!banner)return;
  const date=new Date();
  const year=date.getFullYear();
  const at=(y,m,d)=>new Date(y,m,d);
  const between=(start,end)=>date>=start&&date<end;
  const nthWeekday=(y,m,weekday,n)=>{
    const first=at(y,m,1);
    return 1+((weekday-first.getDay()+7)%7)+(n-1)*7;
  };
  const lastWeekday=(y,m,weekday)=>{
    const last=new Date(y,m+1,0);
    return last.getDate()-((last.getDay()-weekday+7)%7);
  };
  const fourthFriday=at(year,10,nthWeekday(year,10,5,4));
  const blackFridayStart=at(year,10,fourthFriday.getDate()-4);
  const blackFridayEnd=at(year,10,fourthFriday.getDate()+3);
  const thanksgiving=at(year,10,nthWeekday(year,10,4,4));
  const mothersDay=at(year,4,nthWeekday(year,4,0,2));
  const memorialDay=at(year,4,lastWeekday(year,4,1));
  const laborDay=at(year,8,nthWeekday(year,8,1,1));
  const campaigns=[
    {id:'blackfriday',start:blackFridayStart,end:blackFridayEnd,priority:100,kicker:'THE BIGGEST EVENT OF THE YEAR',title:'BLACK FRIDAY',description:'The Black Friday week event is here. Explore selected offers.',cta:'SHOP THE EVENT',href:'shop.html'},
    {id:'thanksgiving',start:at(year,10,thanksgiving.getDate()-1),end:at(year,10,thanksgiving.getDate()+3),priority:75,kicker:'A LITTLE THANK YOU',title:'THANKSGIVING',description:'Celebrate the season with The Egyptian King.',cta:'EXPLORE THE SHOP',href:'shop.html'},
    {id:'christmas',start:at(year,11,1),end:at(year,11,26),priority:60,kicker:'THE HOLIDAY EDIT',title:'CHRISTMAS SPECIAL',description:'Find a standout gift and finish the year in style.',cta:'EXPLORE THE EDIT',href:'shop.html'},
    {id:'newyear',start:at(year,0,1),end:at(year,0,8),priority:55,kicker:'A NEW YEAR. A NEW STANDARD.',title:'NEW YEAR DROP',description:'Start the year with a fresh look.',cta:'DISCOVER THE DROP',href:'shop.html'},
    {id:'valentines',start:at(year,1,7),end:at(year,1,15),priority:50,kicker:'MADE TO STAND OUT',title:'VALENTINE’S EDIT',description:'A special edit for sharing your style.',cta:'EXPLORE THE EDIT',href:'shop.html'},
    {id:'spring',start:at(year,2,20),end:at(year,3,6),priority:35,kicker:'THE SEASONAL COLLECTION',title:'SPRING DROP',description:'Fresh energy. New-season style.',cta:'SEE WHAT’S NEW',href:'shop.html'},
    {id:'mothers',start:at(year,4,mothersDay.getDate()-5),end:at(year,4,mothersDay.getDate()+1),priority:45,kicker:'THE GIFTING EDIT',title:'MOTHER’S DAY',description:'Make the day special with a thoughtful gift.',cta:'SHOP THE EDIT',href:'shop.html'},
    {id:'memorial',start:at(year,4,memorialDay.getDate()-3),end:at(year,4,memorialDay.getDate()+1),priority:40,kicker:'MEMORIAL DAY WEEKEND',title:'HONOR & REMEMBER',description:'A weekend to remember. Discover the collection.',cta:'EXPLORE THE SHOP',href:'shop.html'},
    {id:'summer',start:at(year,5,1),end:at(year,5,21),priority:35,kicker:'THE SUMMER EDIT',title:'SUMMER STARTS HERE',description:'Light layers. Big energy. Your summer rotation.',cta:'SHOP SUMMER',href:'shop.html'},
    {id:'july4',start:at(year,6,1),end:at(year,6,6),priority:50,kicker:'INDEPENDENCE DAY • JULY 4',title:'THE FREEDOM DROP',description:'Celebrate the Fourth in your own style.',cta:'EXPLORE THE DROP',href:'shop.html'},
    {id:'backtoschool',start:at(year,7,1),end:at(year,8,11),priority:45,kicker:'THE NEW-TERM EDIT',title:'BACK TO SCHOOL',description:'Start the school year with a fresh rotation.',cta:'BUILD YOUR ROTATION',href:'shop.html'},
    {id:'labor',start:at(year,8,laborDay.getDate()-3),end:at(year,8,laborDay.getDate()+1),priority:48,kicker:'LABOR DAY WEEKEND',title:'THE LONG WEEKEND EDIT',description:'Make the most of the long weekend.',cta:'EXPLORE THE SHOP',href:'shop.html'},
    {id:'halloween',start:at(year,9,20),end:at(year,10,1),priority:55,kicker:'AFTER DARK',title:'HALLOWEEN SPECIAL',description:'A darker look for spooky season.',cta:'ENTER THE EDIT',href:'shop.html'}
  ];
  function islamicCampaign(){
    try{
      const fmt=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{month:'long',day:'numeric'});
      const parts=fmt.formatToParts(date);
      const month=parts.find(p=>p.type==='month')?.value||'';
      const day=Number(parts.find(p=>p.type==='day')?.value||0);
      if(month.toLowerCase().includes('ramadan'))return {id:'ramadan',priority:65,kicker:'A MONTH OF REFLECTION',title:'RAMADAN SPECIAL',description:'A thoughtful seasonal edit from The Egyptian King.',cta:'EXPLORE THE EDIT',href:'shop.html'};
      if(month.toLowerCase().includes('shawwal')&&day>=1&&day<=3)return {id:'eid',priority:70,kicker:'EID MUBARAK',title:'EID CELEBRATION',description:'Celebrate Eid with a fresh look.',cta:'SHOP THE EDIT',href:'shop.html'};
    }catch(e){}
    return null;
  }
  const islamic=islamicCampaign();
  if(islamic)campaigns.push(islamic);
  const active=campaigns.filter(c=>(c.start&&c.end)?between(c.start,c.end):true).sort((a,b)=>b.priority-a.priority)[0];
  if(!active)return;
  banner.className='is-active event-'+active.id;
  const inner=document.createElement('div');inner.className='tek-event-inner';
  const copy=document.createElement('div');copy.className='tek-event-copy';
  const kicker=document.createElement('span');kicker.className='tek-event-kicker';kicker.textContent=active.kicker;
  const title=document.createElement('h2');title.className='tek-event-title';title.textContent=active.title;
  const description=document.createElement('p');description.className='tek-event-description';description.textContent=active.description;
  const action=document.createElement('a');action.className='tek-event-action';action.href=active.href;action.textContent=active.cta+'  ↗';
  copy.append(kicker,title,description);inner.append(copy,action);banner.replaceChildren(inner);
})();
