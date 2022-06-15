'''
Channels routing configuration.
'''

from channels.routing import route
from stt_app.consumers import ws_connect, ws_message, ws_disconnect
channel_routing = [
    route("websocket.connect", ws_connect),
    route("websocket.receive", ws_message),
    route("websocket.disconnect", ws_disconnect),
]
