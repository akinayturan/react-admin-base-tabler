import React, { useCallback, useEffect, useState } from "react";
import { useAuth, useLogin, useQueryParams, ValidatorProvider } from "react-admin-base";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router";
import { LoadingButton, Validator } from "react-admin-base-bootstrap";
import Layout from "../Layout.js";
import Icon from "../../Icon.js";

const errorMessages = {
  invalid_grant: "INVALID_PASSWORD",
};

export default function Login({ children }: { children?: React.ReactNode }) {
  const [api] = useAuth();
  const login = useLogin();
  const intl = useIntl();
  const { code } = useQueryParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const loginByCode = useCallback(async () => {
    if (!code) return;
    setLoading(true);
    try {
      await api.log_in_by_code(code, window.location.origin + login.login);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, [api, code, login.login]);

  useEffect(() => {
    loginByCode();
  }, [loginByCode]);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);
    try {
      await api.log_in(username, password);
    } catch (requestError: any) {
      const messageId = errorMessages[requestError?.message];
      setError(messageId ? new Error(intl.formatMessage({ id: messageId })) : requestError);
    } finally {
      setLoading(false);
    }
  }, [api, intl, loading, password, username]);

  if (code && loading) return <Layout />;

  return (
    <Layout>
      <ValidatorProvider>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="h2 mb-1"><FormattedMessage id="LOGIN_HEAD" /></h2>
            <p className="text-secondary mb-0">Enter your account details to continue.</p>
          </div>

          {login.register && (
            <Link className="btn btn-outline-primary w-100 mb-3" to={login.register}>
              <FormattedMessage id="NEW_ACCOUNT" />
            </Link>
          )}

          {children && (
            <div className="mb-4">
              <div className="d-grid gap-2">{children}</div>
              <div className="hr-text mt-3"><FormattedMessage id="OR" /></div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label"><FormattedMessage id="USERNAME_OR_EMAIL" defaultMessage="Username or email" /></label>
            <div className="input-icon">
              <span className="input-icon-addon"><Icon name="fa-envelope" size={17} /></span>
              <Validator name="username or email" type="required">
                <input
                  className="form-control"
                  type="text"
                  value={username}
                  onChange={(event) => { setUsername(event.currentTarget.value); setError(null); }}
                  disabled={loading}
                  autoComplete="username"
                />
              </Validator>
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label"><FormattedMessage id="PASSWORD" /></label>
            <div className="input-icon">
              <span className="input-icon-addon"><Icon name="fa-lock" size={17} /></span>
              <Validator name="password" type="required">
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => { setPassword(event.currentTarget.value); setError(null); }}
                  disabled={loading}
                  autoComplete="current-password"
                />
              </Validator>
            </div>
          </div>

          {login.reset && (
            <div className="text-end mb-3">
              <Link className="small text-decoration-none" to={login.reset}><FormattedMessage id="FORGOT_PASSWORD" /></Link>
            </div>
          )}

          {error && <div className="alert alert-danger" role="alert">{error.message}</div>}

          <LoadingButton type="submit" className="btn btn-primary w-100" color="primary" loading={loading}>
            <FormattedMessage id="LOGIN" />
          </LoadingButton>
        </form>
      </ValidatorProvider>
    </Layout>
  );
}
