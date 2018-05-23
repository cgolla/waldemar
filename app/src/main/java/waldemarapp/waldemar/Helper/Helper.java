package waldemarapp.waldemar.Helper;


import com.wikitude.architect.ArchitectJavaScriptInterfaceListener;
import com.wikitude.architect.ArchitectView;

import org.json.JSONException;
import org.json.JSONObject;

import waldemarapp.waldemar.ViewController.MainActivity;

public class Helper implements ArchitectJavaScriptInterfaceListener,ArchitectView.ArchitectWorldLoadedListener{

    private MainActivity myMainActivity = new MainActivity();

    public Helper(MainActivity MainActivity){
        this.myMainActivity = MainActivity;
        //architectView = new ArchitectView();
    }

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
        }// toggle Scan-Button to be transparent, when helpText is shown
        if (s.contains("hideScanButton")){
            myMainActivity.runOnUiThread (new Thread(new Runnable() {
                public void run() {
                    myMainActivity.toggleScanButton("hide");
                }
            }));
        } // toggle Scan-Button to be visible in any other case
        if (s.contains("showScanButton")){
            myMainActivity.runOnUiThread (new Thread(new Runnable() {
                public void run() {
                    myMainActivity.toggleScanButton("show");
                }
            }));
        }
    }
}
