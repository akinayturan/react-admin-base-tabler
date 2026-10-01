import React, { useCallback, useState } from "react";
import { useAuth, ValidatorProvider } from "react-admin-base";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router";
import { LoadingButton, PasswordInput, Validator } from "react-admin-base-bootstrap";
import Layout from "../Layout.js";

export default function Reset() {
  const [api] = useAuth();
  const intl = useIntl();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);
    try {
      if (step === 1) {
        setSignature((await api.free.post("/reset", { email })).data);
        setStep(2);
      } else if (step === 2) {
        await api.free.get(signature, { params: { code } });
        setPassword("");
        setStep(3);
      } else {
        await api.free.post(signature, { email, password }, { params: { code } });
        await api.log_in(email, password);
        setStep(1);
      }
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, [api, code, email, loading, password, signature, step]);

  const changeEmail = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setStep(1);
    setEmail("");
    setCode("");
  }, []);

  return (
    <Layout>
      <ValidatorProvider>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="h2 mb-1"><FormattedMessage id="RESET_PASSWORD" /></h2>
            <p className="text-secondary mb-0">We will guide you through the recovery process.</p>
          </div>

          <div className="mb-3">
            <label className="form-label"><FormattedMessage id="EMAIL" /></label>
            <Validator name="email" type="required|email">
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) => { setEmail(event.currentTarget.value); setError(null); }}
                disabled={loading || step > 1}
                autoComplete="username"
              />
            </Validator>
          </div>

          {step === 2 && (
            <>
              <div className="mb-3">
                <label className="form-label"><FormattedMessage id="AUTH_CODE" /></label>
                <Validator name="code" type="required">
                  <input
                    className="form-control"
                    value={code}
                    onChange={(event) => setCode(event.currentTarget.value)}
                    placeholder={intl.formatMessage({ id: "AUTHORIZATION_CODE" })}
                    disabled={loading}
                  />
                </Validator>
              </div>
              <p className="text-secondary small"><FormattedMessage id="ENTER_AUTH_CODE" values={{ email: <strong>{email}</strong> }} /></p>
              <p className="small"><FormattedMessage id="CHANGE_EMAIL" values={{ a: (text) => <a href="#" onClick={changeEmail}>{text}</a> }} /></p>
            </>
          )}

          {step === 3 && (
            <PasswordInput
              value={password}
              onChange={(value) => { setPassword(value); setError(null); }}
              disabled={loading}
              required
            />
          )}

          {error && <div className="alert alert-danger" role="alert">{error.message}</div>}

          <div className="row g-2 mt-4">
            <div className="col"><Link to="/login" className="btn btn-outline-secondary w-100"><FormattedMessage id="BACK" /></Link></div>
            <div className="col"><LoadingButton type="submit" className="btn btn-primary w-100" color="primary" loading={loading}><FormattedMessage id="SUBMIT" /></LoadingButton></div>
          </div>
        </form>
      </ValidatorProvider>
    </Layout>
  );
}
