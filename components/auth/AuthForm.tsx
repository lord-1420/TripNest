"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signInAction, signUpAction, type AuthState } from "@/lib/actions/auth";

export default function AuthForm({ mode, next }: { mode: "sign-in" | "sign-up"; next?: string }) {
  const action = mode === "sign-in" ? signInAction : signUpAction;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {});
  const [role, setRole] = useState<"TRAVELLER" | "PROVIDER">("TRAVELLER");

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}

      {mode === "sign-up" && (
        <>
          <div>
            <label htmlFor="name" className="field-label">Full name</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              defaultValue={state.values?.name}
              className="field"
              placeholder="Akosua Danso"
            />
          </div>
          <fieldset>
            <legend className="field-label">I am signing up as</legend>
            <input type="hidden" name="role" value={role} />
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "TRAVELLER", title: "A traveller", body: "Save places, build trips and budgets" },
                { value: "PROVIDER", title: "A provider", body: "List a hostel, hotel or apartment" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value as "TRAVELLER" | "PROVIDER")}
                  aria-pressed={role === option.value}
                  className={
                    "border p-3 text-left transition " +
                    (role === option.value
                      ? "border-forest bg-cream-200"
                      : "border-line bg-white hover:border-forest/30")
                  }
                >
                  <span className="block text-[0.86rem] font-semibold text-forest">{option.title}</span>
                  <span className="mt-0.5 block text-[0.72rem] leading-snug text-muted">{option.body}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </>
      )}

      <div>
        <label htmlFor="email" className="field-label">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          className="field"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="field-label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          required
          minLength={mode === "sign-up" ? 8 : undefined}
          className="field"
          placeholder={mode === "sign-up" ? "At least 8 characters" : "Your password"}
        />
      </div>

      {state.error && (
        <p role="alert" className="border border-[#F0CFC7] bg-[#FBEAE6] px-3 py-2 text-[0.82rem] text-[#8C3524]">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-[0.82rem] text-muted">
        {mode === "sign-in" ? (
          <>
            New to TripNest?{" "}
            <Link href="/sign-up" className="font-semibold text-forest underline underline-offset-2">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-forest underline underline-offset-2">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
