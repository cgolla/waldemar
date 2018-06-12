package waldemarapp.waldemar.Helper;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.webkit.JavascriptInterface;

import waldemarapp.waldemar.ViewController.GameHubActivity;
import waldemarapp.waldemar.ViewController.MainActivity;

/**
 * Interface to allow communication between Java Script and Android outside of Wikitude-context.
 * Created by cgolla on 23.05.2018.
 */
public class GameHubJsInterface {

    /*========== VARS ===============================*/

    private static final String TAG = "GameHubJsInterface"; // Tag for logging in console
    Context mContext;

    /*========== CONSTRUCTOR ===============================*/

    /**
     * Constructor to instantiate the interface.
     * @param context Context
     */
    public GameHubJsInterface(Context context) {
        mContext = context;
    }

    /*========== CUSTOM FUNCTIONS ===============================*/
    /**
     * Starts an intent to the main activity.
     */
    @JavascriptInterface
    public void startMainActivity() {
        Intent intent = new Intent(mContext, MainActivity.class);
        mContext.startActivity(intent);
    }

    /**
     * Finishes the current GameHubActivity. Calls startMainActivity() if finishing fails.
     * Called from inside JavaScript by using GameHub.finishGameHub.
     */
    @JavascriptInterface
    public void finishGameHub() {
        try{
            GameHubActivity activity = (GameHubActivity) mContext;
            activity.finish();
        }catch(Exception e){
            Log.e(TAG, "Couldn't finish activity. Attempting to relaunch MainActivity." +e.getStackTrace());
            this.startMainActivity();
        }

    }

}
