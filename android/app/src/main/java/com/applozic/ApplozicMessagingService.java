package com.applozic;

import android.util.Log;

import com.applozic.mobicomkit.api.notification.MobiComPushReceiver;
import com.evollu.react.fcm.MessagingService;
import com.google.firebase.messaging.RemoteMessage;

/**
 * Created by akshat on 06-Jan-17.
 */

public class ApplozicMessagingService extends MessagingService {
    final private static String TAG = "ApplozicMessagingService";

    public void onMessageReceived(RemoteMessage remoteMessage){
        Log.i(TAG, "Got message " + remoteMessage.getFrom());
        if (MobiComPushReceiver.isMobiComPushNotification(remoteMessage.getData())) {
            MobiComPushReceiver.processMessageAsync(this, remoteMessage.getData());
//            return;
        }
        super.onMessageReceived(remoteMessage);
    }
}
