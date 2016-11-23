import realm from '../../lib/realm';
import AppActions from '../../lib/appActions';

export const initialTicketState = {
  loaded:false,
  datalist:[],
};
export function ticket(state = initialTicketState, action) { 
  let tickets = realm.objects('Tickets');
  switch (action.type) {
    case AppActions.TICKET_LOADED:
      realm.write(()=>{
        realm.create('Tickets',{
          id:parseInt(action.id),
          user_id:parseInt(action.user_id),
          agent_id:parseInt(action.agent_id),
          cat_id:parseInt(action.cat_id),
          cat_level:parseInt(action.cat_level),
          priorited:String(action.priorited),
          title:String(action.title),
          text:String(action.text),
          files:String(action.files),
          json:String(action.json),
          status:parseInt(action.status),
          callback:String(action.callback),
          created_at:parseInt(action.created_at),
          updated_at:parseInt(action.updated_at), 
        });
      });
      return state;
    default:
      return state;
    
  }
}