
from flask import Flask, render_template
app = Flask(__name__)

# idt is ireps datatable,
# ml1 is menu level 1,
# ml2 is menu level 2
# ml3 is menu level 3


@app.route("/idt")
def idt():
    return render_template("idt.html")


if __name__ == "__main__":
    app.run(debug=True)



