"use client"

import type React from "react"
import { useState } from "react"
import {
  User,
  Phone,
  HeartPulse,
  Contact,
  ClipboardCheck,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FieldProps = {
  id: string
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
  hint?: string
}

function Field({ id, label, required, className, children, hint }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

const fieldBase =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(fieldBase, "appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-9", props.className)} />
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        fieldBase,
        "h-auto min-h-[88px] resize-y py-2 leading-relaxed",
        props.className,
      )}
    />
  )
}

type SectionProps = {
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}

function Section({ icon, title, description, children }: SectionProps) {
  return (
    <section className="border-t border-border px-6 py-6 first:border-t-0 sm:px-8">
      <div className="mb-5 flex items-start gap-3">
        <span
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
          aria-hidden="true"
        >
          {icon}
        </span>
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

const initialState = {
  fullName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  phone: "",
  email: "",
  address: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  conditions: "",
  allergies: "",
  insuranceProvider: "",
}

export function PatientRegistrationForm() {
  const [values, setValues] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof typeof initialState>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setSubmitted(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    // In a real app this is where you'd POST to your backend.
    console.log("[v0] Patient registration submitted:", values)
  }

  function handleClear() {
    setValues(initialState)
    setSubmitted(false)
  }

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Blue header */}
      <header className="bg-primary px-6 py-7 text-primary-foreground sm:px-8">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
          Eldama Ravine Hospital
        </p>
        <h1 className="mt-1 text-balance text-2xl font-semibold">Patient Registration</h1>
        <p className="mt-1 max-w-prose text-sm text-primary-foreground/90">
          Please complete the form below. Fields marked with{" "}
          <span className="font-semibold">*</span> are required.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <Section
          icon={<User className="size-5" />}
          title="Personal Information"
          description="Tell us who the patient is."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="fullName" label="Full name" required className="sm:col-span-2">
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder="Wanjiku Kamau"
                required
                value={values.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </Field>
            <Field id="dob" label="Date of birth" required>
              <Input
                id="dob"
                name="dob"
                type="date"
                autoComplete="bday"
                required
                value={values.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </Field>
            <Field id="gender" label="Gender" required>
              <Select
                id="gender"
                name="gender"
                required
                value={values.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </Select>
            </Field>
            <Field id="bloodGroup" label="Blood group">
              <Select
                id="bloodGroup"
                name="bloodGroup"
                value={values.bloodGroup}
                onChange={(e) => update("bloodGroup", e.target.value)}
              >
                <option value="">Unknown / select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </Section>

        <Section
          icon={<Phone className="size-5" />}
          title="Contact Information"
          description="How we can reach the patient."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="phone" label="Phone number" required>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="0712 345 678"
                required
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>
            <Field id="email" label="Email address" required>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="wanjiku@example.co.ke"
                required
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>
            <Field id="address" label="Home address" required className="sm:col-span-2">
              <Textarea
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder="P.O. Box 123, Kabarnet Road, Eldama Ravine, Baringo County"
                required
                value={values.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </Field>
          </div>
        </Section>

        <Section
          icon={<Contact className="size-5" />}
          title="Emergency Contact"
          description="Someone we can contact in an emergency."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="emergencyName" label="Contact name" required>
              <Input
                id="emergencyName"
                name="emergencyName"
                placeholder="Otieno Odhiambo"
                required
                value={values.emergencyName}
                onChange={(e) => update("emergencyName", e.target.value)}
              />
            </Field>
            <Field id="emergencyRelationship" label="Relationship" required>
              <Input
                id="emergencyRelationship"
                name="emergencyRelationship"
                placeholder="Spouse, parent, friend…"
                required
                value={values.emergencyRelationship}
                onChange={(e) => update("emergencyRelationship", e.target.value)}
              />
            </Field>
            <Field id="emergencyPhone" label="Contact phone" required className="sm:col-span-2">
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                placeholder="0722 987 654"
                required
                value={values.emergencyPhone}
                onChange={(e) => update("emergencyPhone", e.target.value)}
              />
            </Field>
          </div>
        </Section>

        <Section
          icon={<HeartPulse className="size-5" />}
          title="Medical Information"
          description="Helps our care team treat the patient safely."
        >
          <div className="grid grid-cols-1 gap-4">
            <Field
              id="conditions"
              label="Existing medical conditions"
              hint="e.g. asthma, diabetes, hypertension. Leave blank if none."
            >
              <Textarea
                id="conditions"
                name="conditions"
                placeholder="List any ongoing conditions…"
                value={values.conditions}
                onChange={(e) => update("conditions", e.target.value)}
              />
            </Field>
            <Field
              id="allergies"
              label="Allergies"
              hint="Medications, foods, or other allergies. Leave blank if none."
            >
              <Textarea
                id="allergies"
                name="allergies"
                placeholder="List any known allergies…"
                value={values.allergies}
                onChange={(e) => update("allergies", e.target.value)}
              />
            </Field>
            <Field id="insuranceProvider" label="Insurance provider">
              <Input
                id="insuranceProvider"
                name="insuranceProvider"
                placeholder="e.g. NHIF, Jubilee, AAR, Britam, self-pay"
                value={values.insuranceProvider}
                onChange={(e) => update("insuranceProvider", e.target.value)}
              />
            </Field>
          </div>
        </Section>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-border bg-muted/40 px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
          {submitted && (
            <p
              role="status"
              className="mr-auto flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              <ClipboardCheck className="size-4" />
              Registration submitted. Thank you!
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="size-4" />
            Clear form
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Submit registration
          </Button>
        </div>
      </form>
    </div>
  )
}
