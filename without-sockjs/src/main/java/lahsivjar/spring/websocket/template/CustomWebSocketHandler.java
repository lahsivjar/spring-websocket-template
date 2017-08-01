package lahsivjar.spring.websocket.template;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CustomWebSocketHandler extends TextWebSocketHandler {

    private static final Logger logger = LoggerFactory.getLogger(CustomWebSocketHandler.class);

    /*
     * WebSocket is a very thin layer over TCP and, by default, leaves it upto
     * the application to interpret the meaning of message. Since, in this
     * example/template we don't use any messaging sub protocol (which is
     * allowed by WebSocket RFC-6455) we need to handle the message in its raw
     * form or possibly build a custom framework.
     */
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            TextMessage ackMessage = new TextMessage("ACK: " + message.getPayload());
            session.sendMessage(ackMessage);
        } catch (IOException e) {
            logger.warn("Failed to send message to session {}, ignoring quietly", session.getId());
        }
    }
}
