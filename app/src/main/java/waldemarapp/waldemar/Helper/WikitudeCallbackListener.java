package waldemarapp.waldemar.Helper;


import android.content.Intent;
import android.util.Log;

import com.wikitude.architect.ArchitectJavaScriptInterfaceListener;
import com.wikitude.architect.ArchitectView;

import org.json.JSONException;
import org.json.JSONObject;

import waldemarapp.waldemar.ViewController.GameHubActivity;
import waldemarapp.waldemar.ViewController.MainActivity;

public class WikitudeCallbackListener implements ArchitectJavaScriptInterfaceListener,ArchitectView.ArchitectWorldLoadedListener{


    /*========== VARS ===============================*/
    private static final String TAG = "WikitudeCallbackListen"; // Tag for logging in console

    private MainActivity myMainActivity = new MainActivity();

    /*========== CONSTRUCTOR ===============================*/

    public WikitudeCallbackListener(MainActivity MainActivity){
        this.myMainActivity = MainActivity;
        //architectView = new ArchitectView();
    }

    /*========== OVERRIDES ===============================*/
    @Override
    public void worldWasLoaded(String s) {

    }

    @Override
    public void worldLoadFailed(int i, String s, String s1) {

    }

    // Listener for specific intents
    // (at the moment) used to start a particular game in the GameHubActivity
    @Override
    public void onJSONObjectReceived(JSONObject jsonObject) {
        String s = "";
        try {
            s = jsonObject.getString("parameter");
        } catch (JSONException e) {
            e.printStackTrace();
            System.out.println("Error: unable to parse jsonObject");
        } // Ernas Entensuchspiel
        if (s.contains("startGameHub(erna)")) {
            myMainActivity.startGameHub("erna");
        }// Iggys Schüttelspiel
        else if (s.contains("startGameHub(iggy)")) {
            myMainActivity.startGameHub("iggy");
        }// Tims Zuordnungsspiel
        else if (s.contains("startGameHub(tim)")) {
            myMainActivity.startGameHub("tim");
        }// toggle Scan-Button to be transparent, when helpText is shown
        else if (s.contains("hideScanButton")){
            myMainActivity.runOnUiThread (new Thread(new Runnable() {
                public void run() {
                    myMainActivity.toggleScanButton(true);
                }
            }));
        } // toggle Scan-Button to be visible in any other case
        else if (s.contains("showScanButton")){
            myMainActivity.runOnUiThread (new Thread(new Runnable() {
                public void run() {
                    myMainActivity.toggleScanButton(false);
                }
            }));
        }

    }
}
