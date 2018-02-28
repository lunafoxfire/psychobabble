import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class ApiController {
  public static sendTokenMail(req, res) {
    sgMail.send(req).then((status) => {
      res.status(200);
      console.log(status);
    }).catch((err) => {
      res.status(400);
      console.log(err);
    })
  }
}
