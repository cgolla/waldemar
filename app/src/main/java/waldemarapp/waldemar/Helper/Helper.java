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

    @Override
    public void onJSONObjectReceived(JSONObject jsonObject) {
        String s = "";
        try {
            s = jsonObject.getString("parameter");
        } catch (JSONException e) {
            e.printStackTrace();
            System.out.println("Error: unable to parse jsonObject");
        }
        if (s.contains("startGameHub(erna)")) {

            myMainActivity.startGameHub("erna");
        }
    }
}
